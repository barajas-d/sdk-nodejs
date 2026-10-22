import deleteStore from '.';
import { Stores } from '..';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Testing stores, deleteStore', () => {
	test('deletes a store with encoded user and store IDs, without a body', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const spyFetch = jest.spyOn(RestClient, 'fetch');
	const response = { api_response: { status: 200, headers: [] } };
	spyFetch.mockResolvedValue(response);

	const result = await deleteStore({ userId: 42, id: 'store/a b', config });

	expect(spyFetch).toHaveBeenCalledWith('/users/42/stores/store%2Fa%20b', {
		method: 'DELETE',
		headers: { Authorization: 'Bearer token' },
		timeout: 5000
	});
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});

test('exposes deleteStore through the Stores facade', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const spyFetch = jest.spyOn(RestClient, 'fetch');
	const response = { api_response: { status: 200, headers: [] } };
	spyFetch.mockResolvedValue(response);

	const result = await new Stores(config).deleteStore({ userId: 42, id: 'store/a b', requestOptions: { timeout: 3000 } });

	expect(spyFetch).toHaveBeenCalledWith('/users/42/stores/store%2Fa%20b', {
		method: 'DELETE',
		headers: { Authorization: 'Bearer token' },
		timeout: 3000
	});
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});