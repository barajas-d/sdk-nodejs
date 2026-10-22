import MercadoPago, { ReleasesReport } from '@src/index';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('ReleasesReport, updateReleaseReportConfig', () => {
	test('updates the report configuration using JSON', async () => {
	const config = new MercadoPago({ accessToken: 'test-token' });
	const releasesReport = new ReleasesReport(config);
	const body = { frequency: 'monthly' };
	const response = { ...body, api_response: { status: 200, headers: [] } };
	const fetchSpy = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await releasesReport.updateReleaseReportConfig({ body });

	expect(fetchSpy).toHaveBeenCalledWith('/v1/account/release_report/config', {
		method: 'PUT',
		headers: { Authorization: 'Bearer test-token' },
		body: JSON.stringify(body),
	});
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});