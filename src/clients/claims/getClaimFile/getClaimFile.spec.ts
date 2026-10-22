import getClaimFile from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Claims, getClaimFile', () => {
	test('gets JSON attachment metadata with encoded claim ID and file name, without a body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = {
			file_id: 'file-1',
			file_name: 'invoice #1.pdf',
			content_type: 'application/pdf',
			api_response: { status: 200, headers: [] as [string, string[]] },
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getClaimFile({ claimId: 123, fileName: 'invoice #1.pdf', config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/post-purchase/v1/claims/123/attachments/invoice%20%231.pdf',
			{
				method: 'GET',
				headers: { Authorization: 'Bearer token' },
			}
		);
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});