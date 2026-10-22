import confirmCashoutQr from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing qrOrders, confirmCashoutQr', () => {
	test('should send a confirmed cashout with encoded merchant order ID', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const body = { status: 'confirmed' as const };
	const response = { api_response: { status: 200, headers: [] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await confirmCashoutQr({ merchantOrderId: 'order/123', body, config });

	expect(spyFetch).toHaveBeenCalledWith('/instore/orders/order%2F123/confirmation', {
		method: 'POST',
		headers: { Authorization: 'Bearer token' },
		body: JSON.stringify(body),
		timeout: 5000
	});
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});