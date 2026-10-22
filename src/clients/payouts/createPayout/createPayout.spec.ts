import createPayout from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { PayoutsCreatePayoutClient } from './types';

jest.mock('@utils/restClient');

describe('Payouts createPayout', () => {
	test('sends the batch as JSON to POST /v1/payouts', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const request: PayoutsCreatePayoutClient = {
			config,
			body: {
				external_reference: 'batch-123',
				transactions: [{
					amount: 100,
					beneficiary: {},
					currency_id: 'ARS',
					payment_method_id: 'account_money',
				}],
			},
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		const response = { api_response: { status: 201, headers: [] } };
		spyFetch.mockResolvedValueOnce(response);

		const result = await createPayout(request);

		expect(spyFetch).toHaveBeenCalledWith('/v1/payouts', expect.objectContaining({
			method: 'POST',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(request.body),
		}));
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(201);
	});
});