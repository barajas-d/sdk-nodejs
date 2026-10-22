import deletePos from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing POS, deletePos', () => {
	test('should send DELETE /pos/{id} with an encoded id and no body', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const response = { api_response: { status: 200, headers: [] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await deletePos({ id: 'pos/123', config: client });

		expect(spyFetch).toHaveBeenCalledWith('/pos/pos%2F123', {
			method: 'DELETE',
			headers: { 'Authorization': 'Bearer token' },
			timeout: 5000
		});
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});