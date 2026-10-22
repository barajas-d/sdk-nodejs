import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { WalletPayerTokenCreateClient, WalletPayerTokenResponse } from './types';

export default function createWalletPayerToken({ agreementId, body, config, platformId }: WalletPayerTokenCreateClient): Promise<WalletPayerTokenResponse> {
	return RestClient.fetch<WalletPayerTokenResponse>(
		`/v2/wallet_connect/agreements/${encodePathParam(agreementId)}/payer_token`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
				...(platformId ? { 'x-platform-id': platformId } : {})
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}