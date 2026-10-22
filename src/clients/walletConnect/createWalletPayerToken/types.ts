import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

/** Authorization code supplied by the Wallet Connect flow. */
export type WalletPayerTokenBody = {
	code: string;
};

/** Token returned for the agreement's payer. */
export interface WalletPayerTokenResponse extends ApiResponse {
	payer_token?: string;
}

export type WalletPayerTokenClient = {
	agreement_id: string;
	body: WalletPayerTokenBody;
	config: MercadoPagoConfig;
};

export type WalletPayerTokenData = {
	agreement_id: string;
	body: WalletPayerTokenBody;
	/** Sent as the optional x-platform-id header via request options. */
	requestOptions?: Options;
};