import getSettlementReport from './index';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('getSettlementReport', () => {
	test('fetches the settlement report list', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		const report = { results: [], api_response: { status: 200, headers: [] } };
		spyFetch.mockResolvedValue(report);

		const result = await getSettlementReport({ config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/account/settlement_report', expect.objectContaining({
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
		}));
		expect(result).toEqual(report);
		expect(result.api_response.status).toBe(200);
	});
});