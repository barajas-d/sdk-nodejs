import getClaimHistory from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing claims, getClaimHistory', () => {
	test('should GET encoded claim status history without a body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = [{ status: 'opened' }];
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getClaimHistory({ claimId: '123/456', config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/post-purchase/v1/claims/123%2F456/status_history',
			expect.objectContaining({
				method: 'GET',
				headers: { Authorization: 'Bearer token' }
			})
		);
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
	});
});