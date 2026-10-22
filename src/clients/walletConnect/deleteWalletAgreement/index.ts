import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { WalletAgreementDeleteClient, WalletAgreementDeleteResponse } from './types';

export default function deleteWalletAgreement({ agreementId, clientId, platformId, config }: WalletAgreementDeleteClient): Promise<WalletAgreementDeleteResponse> {
	const queryParams = clientId === undefined ? undefined : { 'client.id': clientId };
	return RestClient.fetch<WalletAgreementDeleteResponse>(
		`/v2/wallet_connect/agreements/${encodePathParam(agreementId)}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
				...(platformId === undefined ? {} : { 'x-platform-id': platformId }),
			},
			...config.options,
			queryParams,
		}
	);
}