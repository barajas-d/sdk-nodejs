import updateTerminalOperationMode from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

jest.mock('@utils/restClient');

describe('Testing update terminal operation mode', () => {
	test('should PATCH the setup endpoint with terminal operating modes', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const body = { terminals: [{ id: 'terminal-1', operating_mode: 'PDV' as const }, { id: 'terminal-2', operating_mode: 'STANDALONE' as const }] };
	const mockedResponse = { api_response: { status: 200, headers: [] as [string, string[]] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockedResponse);

	const response = await updateTerminalOperationMode({ body, config });
	expect(spyFetch).toHaveBeenCalledWith('/terminals/v1/setup', expect.objectContaining({
		method: 'PATCH',
		headers: { Authorization: 'Bearer token' },
		body: JSON.stringify(body),
	}));
	expect(response).toEqual(mockedResponse);
	expect(response.api_response.status).toBe(200);
});
});