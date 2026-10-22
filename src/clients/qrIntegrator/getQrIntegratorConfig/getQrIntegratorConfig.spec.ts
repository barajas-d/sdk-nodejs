import getQrIntegratorConfig from './index';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing QRIntegrator, getQrIntegratorConfig', () => {
	test('should fetch the QR integrator configuration without a request body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = { callback_url: 'https://example.com/callback', api_response: { status: 200, headers: {} } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getQrIntegratorConfig({ config });

		expect(spyFetch).toHaveBeenCalledWith('/instore/integrator', {
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
		});
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});