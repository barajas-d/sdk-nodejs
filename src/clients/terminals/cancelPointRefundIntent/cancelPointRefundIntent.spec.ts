import cancelPointRefundIntent from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

jest.mock('@utils/restClient');

describe('Testing terminals, cancel point refund intent', () => {
	test('sends DELETE with encoded device and refund intent IDs and no body', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const spyFetch = jest.spyOn(RestClient, 'fetch');
	const response = { api_response: { status: 200, headers: [] } };
	spyFetch.mockResolvedValueOnce(response);

	const result = await cancelPointRefundIntent({ deviceid: 'device/one', refundintentid: 'refund/two', config });

	expect(spyFetch).toHaveBeenCalledWith(
		'/point/integration-api/devices/device%2Fone/refund/refund%2Ftwo',
		{
			method: 'DELETE',
			headers: { Authorization: 'Bearer token' },
		}
	);
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});