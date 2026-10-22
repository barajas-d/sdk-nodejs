import getClaimMediationResolutions from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing claims, getClaimMediationResolutions', () => {
	test('should GET expected mediation resolutions for an encoded claim id without a body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const resolutions = [{ id: 'refund', name: 'Refund' }];
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(resolutions);

		const response = await getClaimMediationResolutions({ claimId: '123/456', config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/post-purchase/v1/claims/123%2F456/expected-resolutions',
			expect.objectContaining({
				method: 'GET',
				headers: { Authorization: 'Bearer token' },
			})
		);
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(response).toEqual(resolutions);
	});
});