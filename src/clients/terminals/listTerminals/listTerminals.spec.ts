import listTerminals from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

jest.mock('@utils/restClient');

describe('Testing terminals, listTerminals', () => {
	test('should request the terminal list without a body and return the mocked response', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const response = {
			terminals: [{ id: 'terminal-1', operating_mode: 'PDV', pos_id: 123, status: 'active', store_id: 'store-1' }],
			api_response: { status: 200, headers: [] },
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await listTerminals({ config });

		expect(spyFetch).toHaveBeenCalledWith('/terminals/v1/list', {
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
			...config.options,
		});
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});