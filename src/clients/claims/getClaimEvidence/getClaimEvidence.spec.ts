import getClaimEvidence from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing claims, getClaimEvidence', () => {
	test('should get claim evidence with an encoded claim ID and no body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const evidence = [{ id: 'evidence-1' }];
		const response = { api_response: { status: 200, headers: [] }, ...evidence };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getClaimEvidence({ claimId: 123, config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/post-purchase/v1/claims/123/evidences',
			expect.objectContaining({
				method: 'GET',
				headers: { 'Authorization': 'Bearer token' }
			})
		);
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});