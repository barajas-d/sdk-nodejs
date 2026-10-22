import MercadoPago, { SettlementsReport } from '@src/index';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('SettlementsReport.disableSettlementReportSchedule', () => {
	test('disables automatic report generation without a request body', async () => {
	const config = new MercadoPago({ accessToken: 'test-token' });
	const client = new SettlementsReport(config);
	const mockResponse = { api_response: { status: 200, headers: [] as [string, string[]] } };
	const fetchSpy = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

	const response = await client.disableSettlementReportSchedule();

	expect(fetchSpy).toHaveBeenCalledWith('/v1/account/settlement_report/schedule', {
		method: 'DELETE',
		headers: { Authorization: 'Bearer test-token' },
	});
	expect(response).toEqual(mockResponse);
	expect(response.api_response.status).toBe(200);
});
});