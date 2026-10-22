import getClaimReasons from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing claims, getClaimReasons', () => {
	test('should get an encoded claim reason without a request body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = {
			id: 'reason/1',
			api_response: { status: 200, headers: {} }
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getClaimReasons({ reasonId: 'reason/1', config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/post-purchase/v1/claims/reasons/reason%2F1',
			{
				method: 'GET',
				headers: { 'Authorization': 'Bearer token' }
			}
		);
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});