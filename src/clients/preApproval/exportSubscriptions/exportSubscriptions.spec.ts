import { RestClient } from '@utils/restClient';
import exportSubscriptions from './index';

jest.mock('@utils/restClient');

describe('PreApproval exportSubscriptions', () => {
	test('exports filtered subscriptions as CSV', async () => {
		const csv = 'id,status\n123,authorized\n';
		const expectedResponse = { body: csv, api_response: { status: 200, headers: { 'content-type': ['text/csv'] } } };
		const fetchSpy = jest.spyOn(RestClient, 'fetch').mockResolvedValue(expectedResponse);
		const response = await exportSubscriptions({
			options: {
				collector_id: 123,
				preapproval_plan_id: 'plan-456',
				status: 'authorized',
				sort: 'last_modified',
			},
			config: { accessToken: 'test-token' },
		});

		expect(fetchSpy).toHaveBeenCalledWith('/preapproval/export', expect.objectContaining({
			method: 'GET',
			headers: { Authorization: 'Bearer test-token' },
			queryParams: {
				collector_id: 123,
				preapproval_plan_id: 'plan-456',
				status: 'authorized',
				sort: 'last_modified',
			},
			responseType: 'text',
		}));
		expect(fetchSpy.mock.calls[0][1]).not.toHaveProperty('body');
		expect(response).toEqual(expectedResponse);
	});
});