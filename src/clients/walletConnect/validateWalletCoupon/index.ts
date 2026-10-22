import { RestClient } from '@src/utils/restClient';
import type { WalletCouponValidateClient, WalletCouponValidateResponse } from './types';

export default function validateWalletCoupon({ payerToken, body, config }: WalletCouponValidateClient): Promise<WalletCouponValidateResponse> {
	return RestClient.fetch<WalletCouponValidateResponse>(
		'/v2/wallet_connect/coupons',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
				'x-payer-token': payerToken
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}