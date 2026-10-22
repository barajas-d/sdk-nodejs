import { RestClient } from '@utils/restClient';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/** Body for creating a Wallet Connect agreement. */
export type WalletAgreementCreateBody = {
	return_uri: string;
	external_flow_id: string;
	agreement_data?: {
		description?: string;
		validation_amount?: number;
	};
	external_user?: {
		description?: string;
		id?: string;
	};
};

/** Agreement authorization redirect returned by the API. */
export type WalletAgreementCreateResponse = {
	agreement_id?: string;
	agreement_uri?: string;
	api_response: { status: number; headers: Record<string, string[]> };
};

export type WalletAgreementCreateClient = {
	config: MercadoPagoConfig;
	body: WalletAgreementCreateBody;
	clientId?: string;
	platformId?: string;
};

/** Create a Wallet Connect agreement. */
export default function createWalletAgreement({ body, clientId, platformId, config }: WalletAgreementCreateClient): Promise<WalletAgreementCreateResponse> {
	return RestClient.fetch<WalletAgreementCreateResponse>(
		'/v2/wallet_connect/agreements',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
				...(platformId ? { 'x-platform-id': platformId } : {}),
			},
			body: JSON.stringify(body),
			...(clientId ? { queryParams: { 'client.id': clientId } } : {}),
			...config.options,
		}
	);
}