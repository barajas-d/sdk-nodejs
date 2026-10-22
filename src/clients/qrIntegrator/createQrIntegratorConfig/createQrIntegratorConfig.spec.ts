import createQrIntegratorConfig from './index';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('QRIntegrator.createQrIntegratorConfig', () => {
	test('sends the JSON configuration to PATCH /instore/integrator', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const body = { callback_url: 'https://example.com/callback' };
		const response = { api_response: { status: 200, headers: {} } };
		const fetchSpy = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await createQrIntegratorConfig({ config, body });

		expect(fetchSpy).toHaveBeenCalledWith('/instore/integrator', {
			method: 'PATCH',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(body),
		});
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});