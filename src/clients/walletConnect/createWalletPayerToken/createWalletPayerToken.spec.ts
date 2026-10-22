import createWalletPayerToken from '.';
import { WalletConnect } from '..';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('WalletConnect.createWalletPayerToken', () => {
	test('encodes agreement_id and sends code and optional platform header', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const response = { payer_token: 'payer-token', api_response: { status: 200, headers: [] } };
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);
	const walletConnect = new WalletConnect(config);
	const result = await walletConnect.createWalletPayerToken({
		agreementId: 'agreement/one',
		body: { code: 'authorization-code' },
		platformId: 'platform-123',
	});

	expect(spyFetch).toHaveBeenCalledWith(
		'/v2/wallet_connect/agreements/agreement%2Fone/payer_token',
		expect.objectContaining({
			method: 'POST',
			headers: { Authorization: 'Bearer token', 'x-platform-id': 'platform-123' },
			body: JSON.stringify({ code: 'authorization-code' }),
		})
	);
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});