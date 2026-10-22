import getReleaseReportTask from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('ReleasesReport getReleaseReportTask', () => {
	test('requests an encoded task id with GET and no body', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const result = { id: 'task/42', status: 'done', download_url: null, api_response: { status: 200, headers: [] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(result);

	const response = await getReleaseReportTask({ taskId: 'task/42', config });

	expect(spyFetch).toHaveBeenCalledWith('/v1/account/release_report/task/task%2F42', {
		method: 'GET',
		headers: { Authorization: 'Bearer token' },
	});
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
	expect(response).toEqual(result);
	expect(response.api_response.status).toBe(200);
});
});