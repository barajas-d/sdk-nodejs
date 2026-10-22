import createSettlementReport from './index';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing settlements report, createSettlementReport', () => {
	test('should send the JSON report request to the settlements endpoint', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const body = { begin_date: '2024-01-01', end_date: '2024-01-31' };
	const response = { id: 'task-1', api_response: { status: 202, headers: [] as [string, string[]] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await createSettlementReport({ body, config });

	expect(spyFetch).toHaveBeenCalledWith('/v1/account/settlement_report', expect.objectContaining({
		method: 'POST',
		headers: { Authorization: 'Bearer token' },
		body: JSON.stringify(body),
	}));
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(202);
});
});