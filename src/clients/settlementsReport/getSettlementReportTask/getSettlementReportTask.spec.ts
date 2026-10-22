import MercadoPago, { SettlementsReport } from '@src/index';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('SettlementsReport, getSettlementReportTask', () => {
	test('gets the task with an encoded ID and no request body', async () => {
		const config = new MercadoPago({ accessToken: 'test-access-token' });
		const settlementsReport = new SettlementsReport(config);
		const response = {
			id: 'task/one',
			status: 'finished',
			api_response: { status: 200, headers: [] },
		};
		const fetchSpy = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await settlementsReport.getSettlementReportTask({ taskId: 'task/one' });

		expect(fetchSpy).toHaveBeenCalledWith(
			'/v1/account/settlement_report/task/task%2Fone',
			expect.objectContaining({
				method: 'GET',
				headers: { Authorization: 'Bearer test-access-token' },
			})
		);
		expect(fetchSpy.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});