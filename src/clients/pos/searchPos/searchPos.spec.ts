import searchPos from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing POS, searchPos', () => {
	test('should search POS with optional query filters and no body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = {
			paging: { total: 1, limit: 10, offset: 0 },
			results: [{ id: 123, name: 'Main POS', store_id: '1234567', qr_code: 'qr', qr_code_image: 'image' }],
			api_response: { status: 200, headers: [] as [string, string[]][] }
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);
		const result = await searchPos({
			config,
			options: {
				external_id: 'POS001',
				external_store_id: 'SUC001',
				store_id: '1234567',
				category: 1
			}
		});

		expect(spyFetch).toHaveBeenCalledWith('/pos', expect.objectContaining({
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
			queryParams: {
				external_id: 'POS001',
				external_store_id: 'SUC001',
				store_id: '1234567',
				category: 1
			}
		}));
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result.api_response.status).toBe(200);
		expect(result.paging).toEqual(response.paging);
		expect(result.results).toEqual(response.results);
	});
});