import { RestClient } from '@utils/restClient';
import MercadoPago, { ReleasesReport } from '@src/index';

jest.mock('@utils/restClient');

describe('ReleasesReport enableReleaseReportSchedule', () => {
	test('enables scheduled release reports without a request body', async () => {
	const config = new MercadoPago({ accessToken: 'test-token' });
	const releasesReport = new ReleasesReport(config);
	const response = { api_response: { status: 200, headers: [] as [string, string[]] } };
	const fetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await releasesReport.enableReleaseReportSchedule();

	expect(fetch).toHaveBeenCalledWith('/v1/account/release_report/schedule', {
		method: 'POST',
		headers: { Authorization: 'Bearer test-token' },
	});
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});