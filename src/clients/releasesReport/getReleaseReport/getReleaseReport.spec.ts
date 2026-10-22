import getReleaseReport from './index';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing releasesReport, getReleaseReport', () => {
	test('should GET the releases report list without a request body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		const response = { results: [], api_response: { status: 200, headers: [] } };
		spyFetch.mockResolvedValueOnce(response);

		const result = await getReleaseReport({ config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/account/release_report',
			expect.objectContaining({
				method: 'GET',
				headers: { Authorization: 'Bearer token' },
				timeout: 5000
			})
		);
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});