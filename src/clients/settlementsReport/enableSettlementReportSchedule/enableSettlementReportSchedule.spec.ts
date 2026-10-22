import MercadoPago, { SettlementsReport } from '@src/index';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('SettlementsReport, enableSettlementReportSchedule', () => {
	test('enables scheduled settlement reports without a request body', async () => {
		const config = new MercadoPago({ accessToken: 'test-token' });
		const client = new SettlementsReport(config);
		const response = { api_response: { status: 200, headers: [] as [string, string[]] } };
		const fetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await client.enableSettlementReportSchedule();

		expect(fetch).toHaveBeenCalledWith('/v1/account/settlement_report/schedule', {
			method: 'POST',
			headers: { Authorization: 'Bearer test-token' },
		});
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});