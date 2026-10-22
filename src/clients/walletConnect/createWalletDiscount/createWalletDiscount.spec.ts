import createWalletDiscount from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { WalletDiscountCreateClient, WalletDiscountCreateResponse } from './types';

jest.mock('@utils/restClient');

describe('Testing create wallet discount', () => {
	test('sends the payer token and required discount payload', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const body = { coupon: 'WELCOME', amount: 100 };
	const response: WalletDiscountCreateResponse = {
		currency_id: 'BRL',
		discount: { amount: 10, coupon_id: 'WELCOME', type: 'coupon' },
		legal_terms: 'Terms',
		transaction_amount: 90,
		api_response: { status: 200, headers: [] }
	};
	const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);
	const request: WalletDiscountCreateClient = { config, payerToken: 'payer-token', body };

	const result = await createWalletDiscount(request);

	expect(spyFetch).toHaveBeenCalledWith('/v2/wallet_connect/discounts', {
		method: 'POST',
		headers: {
			Authorization: 'Bearer token',
			'x-payer-token': 'payer-token'
		},
		body: JSON.stringify(body),
		timeout: 5000
	});
	expect(result).toEqual(response);
	expect(result.api_response.status).toBe(200);
});
});