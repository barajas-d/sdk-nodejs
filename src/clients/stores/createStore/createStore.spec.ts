import createStore from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Testing stores, createStore', () => {
	test('should create a store with the encoded user path, JSON body and authorization', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const body = {
			name: 'Main store',
			external_id: 'store-1',
			location: { street_name: 'Main Street' },
			business_hours: { monday: [{ open: '09:00', close: '17:00' }] }
		};
		const response = {
			name: 'Main store',
			api_response: { status: 201, headers: ['content-type', ['application/json']] as [string, string[]] }
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await createStore({ user_id: 42, body, config });

		expect(spyFetch).toHaveBeenCalledWith('/users/42/stores', {
			method: 'POST',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(body),
			timeout: 5000
		});
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(201);
	});
});