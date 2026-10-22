import attachClaimFile from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Claims attachClaimFile', () => {
	test('sends a multipart file to the claim attachments endpoint', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const file = new Blob(['document contents'], { type: 'application/pdf' });
		const result = { file_id: 'file-1', file_name: 'document.pdf', api_response: { status: 201, headers: {} } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(result);

		const response = await attachClaimFile({ claimId: 123, body: { file }, config });

		expect(spyFetch).toHaveBeenCalledWith('/post-purchase/v1/claims/123/attachments', {
			method: 'POST',
			headers: { Authorization: 'Bearer token' },
			body: expect.any(FormData),
			isMultipart: true,
			timeout: 5000,
		});
		const form = spyFetch.mock.calls[0][1]?.body as FormData;
		expect(form.get('file')).toEqual(expect.any(Blob));
		expect((form.get('file') as Blob).size).toBe(file.size);
		expect(response).toEqual(result);
		expect(response.api_response.status).toBe(201);
	});
});