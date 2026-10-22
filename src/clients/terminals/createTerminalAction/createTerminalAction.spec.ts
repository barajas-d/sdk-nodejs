import createTerminalAction from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';

jest.mock('@utils/restClient');

describe('Testing terminal actions, create', () => {
	test('should send the required JSON print action and return the mocked response', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const body = {
		type: 'PRINT_INFO' as const,
		external_reference: 'print-123',
		config: { device_id: 'terminal-123' },
		content: { source: 'https://example.com/receipt.png' },
	};
	const response = { id: 'action-123', status: 'pending' };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await createTerminalAction({ body, config });

	expect(spyFetch).toHaveBeenCalledWith('/terminals/v1/actions', expect.objectContaining({
		method: 'POST',
		headers: { Authorization: 'Bearer token' },
		body: JSON.stringify(body),
		timeout: 5000,
	}));
	expect(result).toEqual(response);
});
});