import getWalletAgreement from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('WalletConnect getWalletAgreement', () => {
	test('encodes agreement_id and passes query and platform headers without a body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const response = {
			id: 'agreement/123',
			status: 'active',
			api_response: { status: 200, headers: {} }
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getWalletAgreement({
			agreementId: 'agreement/123',
			clientId: 'client-id',
			platformId: 'platform-id',
			config
		});

		expect(spyFetch).toHaveBeenCalledWith(
			'/v2/wallet_connect/agreements/agreement%2F123',
			expect.objectContaining({
				method: 'GET',
				headers: expect.objectContaining({
					Authorization: 'Bearer token',
					'x-platform-id': 'platform-id'
				}),
				queryParams: { 'client.id': 'client-id' },
				timeout: 5000
			})
		);
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result.api_response.status).toBe(200);
		expect(result).toEqual(response);
	});
});