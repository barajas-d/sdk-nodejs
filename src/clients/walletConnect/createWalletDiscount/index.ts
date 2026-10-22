import { RestClient } from '@utils/restClient';
import type { WalletDiscountCreateClient, WalletDiscountCreateResponse } from './types';

export default function createWalletDiscount({ payerToken, body, config }: WalletDiscountCreateClient): Promise<WalletDiscountCreateResponse> {
	return RestClient.fetch<WalletDiscountCreateResponse>(
		'/v2/wallet_connect/discounts',
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