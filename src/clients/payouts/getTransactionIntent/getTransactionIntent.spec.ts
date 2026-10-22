import getTransactionIntent from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Payouts } from '..';

jest.mock('@utils/restClient');

describe('Payouts.getTransactionIntent', () => {
	test('encodes id and sends GET without a body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = { api_response: { status: 200 } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getTransactionIntent({ id: 'intent /123', config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/transaction-intents/intent%20%2F123', {
			method: 'GET',
			headers: { Authorization: 'Bearer token' }
		});
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
	});

	test('exposes getTransactionIntent through Payouts', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = { api_response: { status: 200 } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await new Payouts(config).getTransactionIntent({ id: 'intent/123', requestOptions: { timeout: 5000 } });

		expect(spyFetch).toHaveBeenCalledWith('/v1/transaction-intents/intent%2F123', {
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
			timeout: 5000
		});
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result).toEqual(response);
	});
});