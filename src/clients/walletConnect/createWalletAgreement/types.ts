import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

/** JSON body for creating a Wallet Connect authorization agreement. */
export type WalletAgreementCreateRequest = {
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

export type WalletAgreementCreateResponse = ApiResponse & {
	agreement_id?: string;
	agreement_uri?: string;
};

export type WalletAgreementCreateData = {
	body: WalletAgreementCreateRequest;
	clientId?: string;
	platformId?: string;
	requestOptions?: Options;
};

export type WalletAgreementCreateClient = Omit<WalletAgreementCreateData, 'requestOptions'> & {
	config: MercadoPagoConfig;
};