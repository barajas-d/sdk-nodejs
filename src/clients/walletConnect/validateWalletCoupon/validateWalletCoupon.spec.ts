import validateWalletCoupon from '.';
import { WalletConnect } from '..';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('WalletConnect.validateWalletCoupon', () => {
	test('sends the required payer token and coupon id as JSON', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access-token', options: { timeout: 5000 } });
		const body = { id: 'coupon-123' };
		const mockResponse = {
			status: 'active',
			description: 'Coupon available',
			legal_terms: 'Terms',
			detail: {},
			api_response: { status: 200, headers: [] }
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);
		const result = await validateWalletCoupon({ body, payerToken: 'payer-token', config });

		expect(spyFetch).toHaveBeenCalledWith('/v2/wallet_connect/coupons', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer access-token',
				'x-payer-token': 'payer-token'
			},
			body: JSON.stringify(body),
			timeout: 5000
		});
		expect(result).toEqual(mockResponse);
		expect(result.api_response.status).toBe(200);
	});

	test('exposes validation through WalletConnect with request options', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access-token' });
		const walletConnect = new WalletConnect(config);
		const mockResponse = {
			status: 'inactive',
			description: 'Coupon unavailable',
			api_response: { status: 200, headers: [] }
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);
		const body = { id: 'coupon-456' };
		const result = await walletConnect.validateWalletCoupon({
			body,
			payerToken: 'another-token',
			requestOptions: { timeout: 3000 }
		});

		expect(spyFetch).toHaveBeenCalledWith('/v2/wallet_connect/coupons', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer access-token',
				'x-payer-token': 'another-token'
			},
			body: JSON.stringify(body),
			timeout: 3000
		});
		expect(result).toEqual(mockResponse);
		expect(result.api_response.status).toBe(200);
	});
});