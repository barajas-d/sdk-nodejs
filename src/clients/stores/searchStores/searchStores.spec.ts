import searchStores from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Testing stores, searchStores', () => {
	test('forwards the encoded user path, external_id filter and request settings', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const page = {
		paging: { total: 1, offset: 0, limit: 10 },
		results: [{ id: 'store-1', name: 'Test store', external_id: 'shop/one' }],
		api_response: { status: 200, headers: [] as [string, string[]] }
	};
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(page);

	const found = await searchStores({ user_id: 123, external_id: 'shop/one', config });

	expect(spyFetch).toHaveBeenCalledWith('/users/123/stores/search', {
		method: 'GET',
		headers: { Authorization: 'Bearer token' },
		queryParams: { external_id: 'shop/one' },
		timeout: 5000
	});
	expect(found).toEqual(page);
	expect(found.api_response.status).toBe(200);
});
});