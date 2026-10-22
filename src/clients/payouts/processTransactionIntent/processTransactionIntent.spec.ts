import processTransactionIntent from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Payouts } from '..';

import type { ProcessTransactionIntentClient } from './types';

jest.mock('@utils/restClient');

describe('Payouts processTransactionIntent', () => {
	test('sends a JSON transaction intent to the processing endpoint', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const request: ProcessTransactionIntentClient = {
		body: {
			external_reference: 'PAYOUT-001',
			point_of_interaction: { type: 'PIX' },
			transaction: {
				amount: 100,
				currency_id: 'BRL',
				receiver: { account: '123' },
			},
		},
		config,
	};
	const response = { api_response: { status: 201, headers: [] as [string, string[]] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await processTransactionIntent(request);

	expect(spyFetch).toHaveBeenCalledWith('/v1/transaction-intents/process', expect.objectContaining({
		method: 'POST',
		headers: { Authorization: 'Bearer token' },
		body: JSON.stringify(request.body),
	}));
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(201);
});

test('exposes processing through the Payouts facade', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const payouts = new Payouts(config);
	const body: ProcessTransactionIntentClient['body'] = {
		external_reference: 'PAYOUT-002',
		point_of_interaction: { type: 'PIX' },
		transaction: { amount: 10, currency_id: 'BRL', receiver: { account: '456' } },
	};
	const response = { api_response: { status: 201, headers: [] as [string, string[]] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await payouts.processTransactionIntent({ body, requestOptions: { timeout: 5000 } });

	expect(spyFetch).toHaveBeenCalledWith('/v1/transaction-intents/process', expect.objectContaining({
		method: 'POST',
		headers: { Authorization: 'Bearer token' },
		body: JSON.stringify(body),
		timeout: 5000,
	}));
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(201);
});
});