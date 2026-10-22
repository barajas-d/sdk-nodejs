import cancelTerminalAction from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

jest.mock('@utils/restClient');

describe('Testing terminal action, cancel', () => {
	test('should POST the encoded action ID without a request body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = { api_response: { status: 200, headers: [] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await cancelTerminalAction({ action_id: 'action/123', config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/terminals/v1/actions/action%2F123/cancel',
			expect.objectContaining({
				method: 'POST',
				headers: { Authorization: 'Bearer token' },
			})
		);
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});