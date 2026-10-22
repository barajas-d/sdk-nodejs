import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

/** Parameters accepted when revoking a Wallet Connect agreement. */
export type WalletAgreementDeleteData = {
	agreementId: string;
	/** Optional client.id query parameter. */
	clientId?: string;
	/** Optional x-platform-id request header. */
	platformId?: string;
	requestOptions?: Options;
};

/** Internal request parameters forwarded by the WalletConnect facade. */
export type WalletAgreementDeleteClient = Omit<WalletAgreementDeleteData, 'requestOptions'> & {
	config: MercadoPagoConfig;
};

/** A successful revoke has no documented response body. */
export type WalletAgreementDeleteResponse = ApiResponse;