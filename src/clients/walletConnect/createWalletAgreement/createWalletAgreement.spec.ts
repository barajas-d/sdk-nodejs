import { WalletConnect } from '@src/clients/walletConnect';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('WalletConnect.createWalletAgreement', () => {
	test('sends required agreement fields and optional query and header', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const walletConnect = new WalletConnect(config);
	const body = {
		return_uri: 'https://example.com/return',
		external_flow_id: 'flow-123',
	};
	const response = {
		agreement_id: 'agreement-123',
		agreement_uri: 'https://example.com/authorize',
		api_response: { status: 200, headers: [] },
	};
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

	const result = await walletConnect.createWalletAgreement({
		body,
		clientId: 'client-123',
		platformId: 'platform-123',
	});

	expect(spyFetch).toHaveBeenCalledWith('/v2/wallet_connect/agreements', {
		method: 'POST',
		headers: {
			Authorization: 'Bearer token',
			'x-platform-id': 'platform-123',
		},
		queryParams: { 'client.id': 'client-123' },
		body: JSON.stringify(body),
		timeout: 5000,
	});
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});