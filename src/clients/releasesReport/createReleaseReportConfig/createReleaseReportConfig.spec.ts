import createReleaseReportConfig from './index';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing releases report, createReleaseReportConfig', () => {
	test('should send the configuration as JSON to the release report config endpoint', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const body = {
			columns: ['date', 'amount'],
			file_name_prefix: 'releases',
			frequency: 'daily',
			separator: ';',
			display_timezone: 'America/Argentina/Buenos_Aires',
			notification_email_list: ['reports@example.com']
		};
		const mockResponse = { ...body, api_response: { status: 200, headers: [] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

		const result = await createReleaseReportConfig({ body, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/account/release_report/config', expect.objectContaining({
			method: 'POST',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(body),
			timeout: 5000
		}));
		expect(result).toEqual(mockResponse);
		expect(result.api_response.status).toBe(200);
	});
});