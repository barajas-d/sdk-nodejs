import listPos from '.';
import { POS } from '..';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Testing POS, listPos', () => {
	test('should list POS for an integer user ID without a request body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const pos = new POS(config);
		const response = { api_response: { status: 200, headers: [] }, results: [] };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await pos.listPos({ userId: 123 });

		expect(spyFetch).toHaveBeenCalledWith('/users/123/pos', {
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
		});
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});

	test('should send the same path and no body via the operation function', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = { api_response: { status: 200, headers: [] }, results: [] };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await listPos({ userId: 456, config });

		expect(spyFetch).toHaveBeenCalledWith('/users/456/pos', {
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
		});
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});