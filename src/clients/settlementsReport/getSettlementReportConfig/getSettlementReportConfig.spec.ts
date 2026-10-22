import getSettlementReportConfig from './index';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('SettlementsReport, getSettlementReportConfig', () => {
	test('requests the settlements report configuration', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const body = { columns: ['DATE', 'AMOUNT'] };
	const response = { ...body, api_response: { status: 200, headers: [] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await getSettlementReportConfig({ config });

	expect(spyFetch).toHaveBeenCalledWith('/v1/account/settlement_report/config', expect.objectContaining({
		method: 'GET',
		headers: { Authorization: 'Bearer token' },
	}));
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});