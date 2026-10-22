import createPointRefundIntent from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

jest.mock('@utils/restClient');

describe('Testing terminal refund intent, create', () => {
	test('should POST the refund request and return the created intent', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const body = { payment_id: 12345, amount: 12.5 };
		const response = { id: 'refund-1', status: 'pending', api_response: { status: 200, headers: [] as [string, string[]] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await createPointRefundIntent({ deviceid: 'device/1', body, config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/point/integration-api/devices/device%2F1/refund',
			expect.objectContaining({
				method: 'POST',
				headers: { Authorization: 'Bearer token' },
				body: JSON.stringify(body),
			})
		);
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
		expect(result.id).toBe('refund-1');
		expect(result.status).toBe('pending');
	});
});