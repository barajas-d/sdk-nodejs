import MercadoPago, { SettlementsReport } from '@src/index';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('SettlementsReport, updateSettlementReportConfig', () => {
	test('updates configuration with a JSON body', async () => {
		const config = new MercadoPago({ accessToken: 'test-token' });
		const client = new SettlementsReport(config);
		const body = { frequency: 'daily' };
		const response = { frequency: 'daily', api_response: { status: 200, headers: [] } };
		const fetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await client.updateSettlementReportConfig({ body });

		expect(fetch).toHaveBeenCalledWith('/v1/account/settlement_report/config', expect.objectContaining({
			method: 'PUT',
			headers: { Authorization: 'Bearer test-token' },
			body: JSON.stringify(body),
		}));
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});