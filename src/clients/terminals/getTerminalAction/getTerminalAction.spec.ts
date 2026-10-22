import getTerminalAction from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

jest.mock('@utils/restClient');

describe('Terminals, getTerminalAction', () => {
	test('gets an action with an encoded ID and no request body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const response = { id: 'action/1', status: 'printed', api_response: { status: 200 } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getTerminalAction({ action_id: 'action/1', config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/terminals/v1/actions/action%2F1',
			expect.objectContaining({
				method: 'GET',
				headers: { Authorization: 'Bearer token' },
				...config.options,
			})
		);
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});