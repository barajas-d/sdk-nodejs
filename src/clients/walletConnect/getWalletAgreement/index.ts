import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { WalletAgreementGetClient, WalletAgreementResponse } from './types';

export default function getWalletAgreement({ agreementId, clientId, platformId, config }: WalletAgreementGetClient): Promise<WalletAgreementResponse> {
	return RestClient.fetch<WalletAgreementResponse>(
		`/v2/wallet_connect/agreements/${encodePathParam(agreementId)}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
				...(platformId ? { 'x-platform-id': platformId } : {}),
			},
			...(clientId ? { queryParams: { 'client.id': clientId } } : {}),
			...config.options,
		}
	);
}