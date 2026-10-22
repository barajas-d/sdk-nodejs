import MercadoPago, { SettlementsReport } from '@src/index';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('SettlementsReport, downloadSettlementReport', () => {
	test('downloads a CSV report using a URL-encoded file name without a request body', async () => {
		const config = new MercadoPago({ accessToken: 'test-access-token' });
		const settlementsReport = new SettlementsReport(config);
		const csv = 'id,amount\n1,100\n';
		const response = {
			body: csv,
			api_response: {
				status: 200,
				headers: { 'content-type': ['text/csv'] },
			},
		};
		const fetchSpy = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await settlementsReport.downloadSettlementReport({ fileName: 'settlement report/2025.csv' });

		expect(fetchSpy).toHaveBeenCalledWith(
			'/v1/account/settlement_report/settlement%20report%2F2025.csv',
			expect.objectContaining({
				method: 'GET',
				headers: { Authorization: 'Bearer test-access-token' },
				responseType: 'text',
			})
		);
		expect(fetchSpy.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
		expect(result.body).toBe(csv);
	});
});