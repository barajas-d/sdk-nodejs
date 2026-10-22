import MercadoPago, { ReleasesReport } from '@src/index';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('ReleasesReport, downloadReleaseReport', () => {
	test('downloads CSV using the encoded filename without a request body', async () => {
	const csv = 'date,amount\n2024-01-01,100\n';
	const mockResponse = {
		body: csv,
		api_response: { status: 200, headers: { 'content-type': ['text/csv'] } },
	};
	const fetchSpy = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);
	const client = new ReleasesReport(new MercadoPago({ accessToken: 'test-token' }));

	const response = await client.downloadReleaseReport({ fileName: 'release report/2024.csv' });

	expect(fetchSpy).toHaveBeenCalledWith(
		'/v1/account/release_report/release%20report%2F2024.csv',
		{
			method: 'GET',
			headers: {
				Authorization: 'Bearer test-token',
				Accept: 'text/csv',
			},
			responseType: 'text',
		}
	);
	expect(response).toEqual(mockResponse);
	expect(response.api_response.status).toBe(200);
	expect(response.body).toBe(csv);
});
});