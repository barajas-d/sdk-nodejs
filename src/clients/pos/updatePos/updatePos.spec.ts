import updatePos from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing POS, updatePos', () => {
	test('sends a JSON PUT to the encoded POS path and returns the response', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const body = { name: 'Front counter', store_id: 'store-1' };
		const response = { id: 123, name: body.name, store_id: body.store_id, api_response: { status: 200, headers: [] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await updatePos({ id: 'counter/1', body, config });

		expect(spyFetch).toHaveBeenCalledWith('/pos/counter%2F1', {
			method: 'PUT',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(body),
			timeout: 5000
		});
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});