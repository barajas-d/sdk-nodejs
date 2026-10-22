import deleteWalletAgreement from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('WalletConnect.deleteWalletAgreement', () => {
	test('encodes agreement_id and forwards client.id and x-platform-id without a body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = { api_response: { status: 200, headers: [] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);
		const result = await deleteWalletAgreement({
			agreementId: 'agreement/one',
			clientId: 'client-123',
			platformId: 'platform-123',
			config
		});

		expect(spyFetch).toHaveBeenCalledWith(
			'/v2/wallet_connect/agreements/agreement%2Fone?client.id=client-123',
			{
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer token',
					'x-platform-id': 'platform-123'
				}
			}
		);
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});