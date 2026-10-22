import createReleaseReport from './index';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing releases report, createReleaseReport', () => {
	test('should POST the report date range as JSON', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const body = {
		begin_date: '2024-01-01T00:00:00Z',
		end_date: '2024-01-31T23:59:59Z',
	};
	const report = { id: 'task-1', status: 'pending' };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(report);

	const result = await createReleaseReport({ body, config });

	expect(spyFetch).toHaveBeenCalledWith('/v1/account/release_report', expect.objectContaining({
		method: 'POST',
		headers: { Authorization: 'Bearer token' },
		body: JSON.stringify(body),
	}));
	expect(result).toEqual(report);
});
});