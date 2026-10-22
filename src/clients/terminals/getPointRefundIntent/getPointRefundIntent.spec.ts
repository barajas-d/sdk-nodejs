import getPointRefundIntent from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

jest.mock('@utils/restClient');

describe('Testing terminal refund intent, get', () => {
	test('should GET the encoded refund intent without a body and return its JSON response', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = {
			id: 'refund/123',
			payment_id: 123456,
			amount: 12.5,
			status: 'pending',
			api_response: { status: 200, headers: [] as [string, string[]] },
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getPointRefundIntent({ refundintentid: 'refund/123', config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/point/integration-api/refund/refund%2F123',
			expect.objectContaining({
				method: 'GET',
				headers: { Authorization: 'Bearer token' },
			})
		);
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});