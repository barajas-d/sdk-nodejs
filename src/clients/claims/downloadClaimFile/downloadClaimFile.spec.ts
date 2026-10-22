import downloadClaimFile from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

test('downloadClaimFile requests encoded attachment bytes without a request body', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const bytes = new Uint8Array([37, 80, 68, 70]).buffer;
	const expected = {
		data: bytes,
		api_response: { status: 200, headers: { 'content-type': ['application/octet-stream'] } },
	};
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(expected);

	const result = await downloadClaimFile({ claimId: '42', fileName: 'file /é.bin', config });

	expect(spyFetch).toHaveBeenCalledWith(
		'/post-purchase/v1/claims/42/attachments/file%20%2F%C3%A9.bin/download',
		{
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
			responseType: 'arrayBuffer',
		}
	);
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	expect(result.api_response.status).toBe(expected.api_response.status);
	expect(new Uint8Array(result.data)).toEqual(new Uint8Array(bytes));
});

describe('Testing claims, downloadClaimFile', () => {
	test('downloads attachment bytes with encoded claim id and file name', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const bytes = new Uint8Array([0, 255, 10, 42]).buffer;
		const expected = {
			data: bytes,
			api_response: { status: 200, headers: { 'content-type': ['application/octet-stream'] } },
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(expected);

		const result = await downloadClaimFile({ claimId: 'claim/1', fileName: 'image 1/é.png', config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/post-purchase/v1/claims/claim%2F1/attachments/image%201%2F%C3%A9.png/download',
			{
				method: 'GET',
				headers: { Authorization: 'Bearer token' },
				timeout: 5000,
				responseType: 'arrayBuffer',
			}
		);
		expect(result).toEqual(expected);
		expect(result.api_response.status).toBe(200);
		expect(new Uint8Array(result.data)).toEqual(new Uint8Array([0, 255, 10, 42]));
	});
});