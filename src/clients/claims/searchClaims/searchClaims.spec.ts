import searchClaims from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing claims, searchClaims', () => {
	test('should send all search filters as query parameters without a body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
	const spyFetch = jest.spyOn(RestClient, 'fetch');
	const response = { results: [], paging: { total: 0, limit: 10, offset: 0 }, api_response: { status: 200, headers: [] } };
	spyFetch.mockResolvedValueOnce(response);

	const result = await searchClaims({
		options: { id: 123, type: 'claims', stage: 'dispute', status: 'opened', limit: 10, offset: 0 },
		config
	});

	expect(spyFetch).toHaveBeenCalledWith(
		'/post-purchase/v1/claims/search',
		expect.objectContaining({
			method: 'GET',
			headers: { 'Authorization': 'Bearer token' },
			queryParams: { id: 123, type: 'claims', stage: 'dispute', status: 'opened', limit: 10, offset: 0 }
		})
	);
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});