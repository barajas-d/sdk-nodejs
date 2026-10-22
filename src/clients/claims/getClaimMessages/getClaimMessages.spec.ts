import getClaimMessages from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing claims, getClaimMessages', () => {
	test('should GET the messages for the encoded claim id without a body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = [{ id: 1, message: 'Hello' }];
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getClaimMessages({ claimId: '123/456', config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/post-purchase/v1/claims/123%2F456/messages',
			expect.objectContaining({
				method: 'GET',
				headers: { 'Authorization': 'Bearer token' }
			})
		);
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
	});
});