import uploadShippingEvidence from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing claims, uploadShippingEvidence', () => {
	test('should POST JSON shipping evidence to the encoded claim path and return the empty 201 response', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const response = { api_response: { status: 201, headers: {} } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);
	const body = { type: 'tracking_code' as const, value: 'TRACK-123' };

	const result = await uploadShippingEvidence({ claimId: 123, body, config });

	expect(spyFetch).toHaveBeenCalledWith(
		'/post-purchase/v1/claims/123/actions/evidences',
		expect.objectContaining({
			method: 'POST',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(body),
		})
	);
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(201);
});
});