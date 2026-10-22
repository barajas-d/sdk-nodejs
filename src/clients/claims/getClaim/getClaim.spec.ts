import getClaim from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing claims, getClaim', () => {
	test('should get a claim with an encoded ID and no request body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = { id: 123, status: 'opened', api_response: { status: 200, headers: [] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getClaim({ claimId: 123, config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/post-purchase/v1/claims/123',
			{
				method: 'GET',
				headers: { Authorization: 'Bearer token' }
			}
		);
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});