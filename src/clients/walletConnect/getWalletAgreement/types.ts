import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

export type WalletAgreementGetClient = {
	agreementId: string;
	clientId?: string;
	platformId?: string;
	config: MercadoPagoConfig;
};

export type WalletAgreementGetData = {
	agreementId: string;
	clientId?: string;
	platformId?: string;
	requestOptions?: Options;
};

export interface WalletAgreementGetResponse extends ApiResponse {
	agreement_data?: {
		description?: string;
		validation_amount?: number;
	};
	application_id?: string;
	approval_uri?: string;
	collector_id?: number;
	date_canceled?: string | null;
	date_created?: string;
	date_expire?: string;
	external_flow_id?: string;
	external_user?: {
		description?: string;
		id?: string;
	};
	id?: string;
	model_version?: number;
	redirect_uri?: string;
	site_id?: 'MLA' | 'MLB' | 'MLM';
	status?: 'active' | 'cancelled' | 'expired';
	validation_code?: string;
}