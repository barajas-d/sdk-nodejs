import MercadoPago, { ReleasesReport } from '@src/index';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('ReleasesReport.listScheduledReleaseReports', () => {
	test('lists scheduled reports without a request body', async () => {
	const config = new MercadoPago({ accessToken: 'test-token' });
	const releasesReport = new ReleasesReport(config);
	const response = { results: [], api_response: { status: 200, headers: [] } };
	const fetchSpy = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await releasesReport.listScheduledReleaseReports();

	expect(fetchSpy).toHaveBeenCalledWith('/v1/account/release_report/list', {
		method: 'GET',
		headers: { Authorization: 'Bearer test-token' },
	});
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});