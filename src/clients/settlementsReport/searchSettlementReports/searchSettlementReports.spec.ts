import searchSettlementReports from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { SettlementsReport } from '..';

jest.mock('@utils/restClient');

describe('SettlementsReport.searchSettlementReports', () => {
	test('sends a GET search with date query parameters and no body', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const response = { results: [], api_response: { status: 200, headers: [] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);
	const queryParams = { begin_date: '2024-01-01T00:00:00Z', end_date: '2024-01-31T00:00:00Z' };

	const result = await searchSettlementReports({ config, ...queryParams });

	expect(spyFetch).toHaveBeenCalledWith('/v1/account/settlement_report/search', expect.objectContaining({
		method: 'GET',
		headers: { 'Authorization': 'Bearer token' },
		queryParams,
	}));
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});

test('exposes searchSettlementReports through the SettlementsReport facade', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const response = { results: [], api_response: { status: 200, headers: [] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);
	const queryParams = { begin_date: '2024-02-01T00:00:00Z', end_date: '2024-02-29T00:00:00Z' };

	const result = await new SettlementsReport(config).searchSettlementReports(queryParams);

	expect(spyFetch).toHaveBeenCalledWith('/v1/account/settlement_report/search', expect.objectContaining({
		method: 'GET',
		headers: { 'Authorization': 'Bearer token' },
		queryParams,
	}));
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});