import sendClaimMessage from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Claims, sendClaimMessage', () => {
	test('sends a JSON message with application_id and an encoded claim path', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const body = { message: 'Please review this claim' };
		const response = { api_response: { status: 201, headers: ['content-type', ['application/json']] as [string, string[]] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await sendClaimMessage({ claimId: 123, applicationId: 'app id', body, config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/post-purchase/v1/claims/123/actions/send-message',
			expect.objectContaining({
				method: 'POST',
				headers: expect.objectContaining({ Authorization: 'Bearer token' }),
				body: JSON.stringify(body),
				queryParams: { application_id: 'app id' },
			})
		);
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(201);
	});
});