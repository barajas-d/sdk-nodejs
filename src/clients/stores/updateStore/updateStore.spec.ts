import updateStore from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Testing stores, updateStore', () => {
	test('should update a store with encoded path parameters and JSON body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const body = { name: 'Updated Store', external_id: 'store-1' };
		const response = { id: 'store/1', name: 'Updated Store', api_response: { status: 200, headers: [] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await updateStore({ user_id: 123, id: 'store/1', body, config });

		expect(spyFetch).toHaveBeenCalledWith('/users/123/stores/store%2F1', {
			method: 'PUT',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(body),
			timeout: 5000
		});
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});