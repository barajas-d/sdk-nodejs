import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { ReleasesReport } from '../index';
import disableReleaseReportSchedule from './index';

jest.mock('@utils/restClient');

describe('ReleasesReport, disableReleaseReportSchedule', () => {
	test('disables scheduled report generation without a request body', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'test-token' });
	const response = { api_response: { status: 200, headers: [] } };
	const fetchSpy = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await disableReleaseReportSchedule({ config });

	expect(fetchSpy).toHaveBeenCalledWith('/v1/account/release_report/schedule', {
		method: 'DELETE',
		headers: { Authorization: 'Bearer test-token' },
	});
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});

test('exposes disableReleaseReportSchedule on the ReleasesReport facade', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'test-token' });
	const response = { api_response: { status: 200, headers: [] } };
	const fetchSpy = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await new ReleasesReport(config).disableReleaseReportSchedule();

	expect(fetchSpy).toHaveBeenCalledWith('/v1/account/release_report/schedule', {
		method: 'DELETE',
		headers: { Authorization: 'Bearer test-token' },
	});
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});