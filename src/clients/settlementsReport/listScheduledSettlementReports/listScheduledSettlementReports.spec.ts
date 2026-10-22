import listScheduledSettlementReports from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing settlementsReport, listScheduledSettlementReports', () => {
	test('should list scheduled settlement reports without a request body', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const response = { results: [], api_response: { status: 200, headers: [] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await listScheduledSettlementReports({ config });

	expect(spyFetch).toHaveBeenCalledWith(
		'/v1/account/settlement_report/list',
		expect.objectContaining({
			method: 'GET',
			headers: { 'Authorization': 'Bearer token' },
		})
	);
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});