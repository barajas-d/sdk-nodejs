import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** An expected resolution available during claim mediation. */
export interface MediationResolution extends ApiResponse {
	type?: 'refund' | 'return' | 'partial_refund';
	amount?: number;
	reason?: string;
}

export interface GetClaimMediationResolutionsData {
	claimId: number;
	requestOptions?: Options;
}

export interface GetClaimMediationResolutionsClient extends GetClaimMediationResolutionsData {
	config: MercadoPagoConfig;
}