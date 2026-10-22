import createSettlementReportConfig from './index';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing settlements report, createSettlementReportConfig', () => {
	test('should POST the JSON configuration and return the mocked response', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const body = { columns: ['DATE', 'SOURCE_ID'] };
	const response = { ...body, api_response: { status: 200, headers: [] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await createSettlementReportConfig({ body, config });

	expect(spyFetch).toHaveBeenCalledWith('/v1/account/settlement_report/config', expect.objectContaining({
		method: 'POST',
		headers: { Authorization: 'Bearer token' },
		body: JSON.stringify(body),
	}));
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});