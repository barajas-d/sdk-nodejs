import getPos from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing POS, getPos', () => {
	test('should GET the encoded POS id with authorization and no body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const response = { id: 123, name: 'Counter', api_response: { status: 200, headers: [] as [string, string[]] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getPos({ id: 'store/123', config });

		expect(spyFetch).toHaveBeenCalledWith('/pos/store%2F123', {
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
			timeout: 5000
		});
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});