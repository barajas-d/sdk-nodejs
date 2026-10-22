import listPayoutTransactions from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Payouts, listPayoutTransactions', () => {
	test('encodes payout_id and sends a GET without a body', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const spyFetch = jest.spyOn(RestClient, 'fetch');
	const response = { api_response: { status: 200, headers: [] } };
	spyFetch.mockResolvedValue(response);

	const result = await listPayoutTransactions({ payout_id: 'batch/1', config });

	expect(spyFetch).toHaveBeenCalledWith('/v1/payouts/batch%2F1/transactions', expect.objectContaining({
		method: 'GET',
		headers: { Authorization: 'Bearer token' },
	}));
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});