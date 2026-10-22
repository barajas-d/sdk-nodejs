import getReleaseReportConfig from './index';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing releases report, getReleaseReportConfig', () => {
	test('should request the releases report configuration', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const response = {
		columns: ['release_date', 'amount'],
		file_name_prefix: 'releases',
		frequency: 'daily',
		api_response: { status: 200, headers: [] }
	};
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await getReleaseReportConfig({ config });

	expect(spyFetch).toHaveBeenCalledWith(
		'/v1/account/release_report/config',
		expect.objectContaining({
			method: 'GET',
			headers: { Authorization: 'Bearer token' }
		})
	);
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});