import searchPos from '.';
import { POS } from '@src/clients/pos';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('POS searchPos', () => {
	test('sends GET /pos with all four query filters and no body, and returns the JSON results', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const paging = { total: 1, limit: 10, offset: 0 };
		const results = [{ id: 1, external_id: 'terminal-1', qr_code: 'qr-1' }];
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue({ paging, results });
		const options = {
			external_id: 'terminal-1',
			external_store_id: 'branch-2',
			store_id: 'store-3',
			category: 4,
		};
		const response = await new POS(config).searchPos({ options });
		expect(spyFetch).toHaveBeenCalledWith('/pos', expect.objectContaining({
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
			queryParams: options,
		}));
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(response.paging).toEqual(paging);
		expect(response.results).toEqual(results);
	});

	test('allows calling the operation without search filters', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue({ paging: { total: 0, limit: 0, offset: 0 }, results: [] });
		await searchPos({ config });
		expect(spyFetch).toHaveBeenCalledWith('/pos', expect.objectContaining({ method: 'GET', queryParams: {} }));
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	});

	test('passes requestOptions through POS.searchPos to RestClient.fetch', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue({ paging: { total: 0, limit: 0, offset: 0 }, results: [] });
		await new POS(config).searchPos({ requestOptions: { timeout: 1234 } });
		expect(spyFetch).toHaveBeenCalledWith('/pos', expect.objectContaining({
			method: 'GET',
			timeout: 1234,
		}));
	});
});
