import requestClaimMediation from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing claims, requestClaimMediation', () => {
	test('should POST to the encoded open-dispute path without a body', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const spyFetch = jest.spyOn(RestClient, 'fetch');
	const response = { api_response: { status: 200, headers: ['content-type', ['application/json']] as [string, string[]] } };
	spyFetch.mockResolvedValueOnce(response);

	const result = await requestClaimMediation({ claimId: 123, config });

	expect(spyFetch).toHaveBeenCalledWith(
		'/post-purchase/v1/claims/123/actions/open-dispute',
		expect.objectContaining({
			method: 'POST',
			headers: { Authorization: 'Bearer token' },
		})
	);
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});