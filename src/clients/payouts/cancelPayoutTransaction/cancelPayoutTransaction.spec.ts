import cancelPayoutTransaction from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { PayoutsCancelPayoutTransactionClient } from './types';

jest.mock('@utils/restClient');

describe('Payouts, cancelPayoutTransaction', () => {
	test('encodes both identifiers and sends a PUT without a body', async () => {
	const request: PayoutsCancelPayoutTransactionClient = {
		payout_id: 'batch/1',
		transaction_id: 'transaction 2',
		config: new MercadoPagoConfig({ accessToken: 'token' }),
	};
	const response = { api_response: { status: 200, headers: [] as [string, string[]] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await cancelPayoutTransaction(request);

	expect(spyFetch).toHaveBeenCalledWith(
		'/v1/payouts/batch%2F1/transactions/transaction%202/cancel',
		expect.objectContaining({
			method: 'PUT',
			headers: { Authorization: 'Bearer token' },
		})
	);
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});