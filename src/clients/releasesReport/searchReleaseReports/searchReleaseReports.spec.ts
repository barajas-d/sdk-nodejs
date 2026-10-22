import MercadoPago, { ReleasesReport } from '@src/index';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('ReleasesReport searchReleaseReports', () => {
	test('searches reports by date without a request body', async () => {
		const config = new MercadoPago({ accessToken: 'test-token' });
		const releasesReport = new ReleasesReport(config);
		const response = {
			results: [],
			api_response: { status: 200, headers: [] as [string, string[]] },
		};
		const fetchSpy = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await releasesReport.searchReleaseReports({
			begin_date: '2025-01-01T00:00:00Z',
			end_date: '2025-01-31T23:59:59Z',
		});

		expect(fetchSpy).toHaveBeenCalledWith('/v1/account/release_report/search', expect.objectContaining({
			method: 'GET',
			headers: { Authorization: 'Bearer test-token' },
			queryParams: {
				begin_date: '2025-01-01T00:00:00Z',
				end_date: '2025-01-31T23:59:59Z',
			},
		}));
		expect(fetchSpy.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});