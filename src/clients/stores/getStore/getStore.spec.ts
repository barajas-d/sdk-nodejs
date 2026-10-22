import getStore from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Stores } from '@src/index';

jest.mock('@utils/restClient');

describe('Testing stores, getStore', () => {
	test('should request GET /stores/{id} with an encoded ID and no body', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const response = { id: 'store/1', name: 'My store', api_response: { status: 200, headers: [] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await new Stores(config).getStore({ id: 'store/1' });

	expect(spyFetch).toHaveBeenCalledWith('/stores/store%2F1', {
		method: 'GET',
		headers: { Authorization: 'Bearer token' }
	});
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});

	test('should forward request options through the getStore operation', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = { id: 'a b', api_response: { status: 200, headers: [] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getStore({ id: 'a b', config });

		expect(spyFetch).toHaveBeenCalledWith('/stores/a%20b', {
			method: 'GET',
			headers: { Authorization: 'Bearer token' }
		});
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});