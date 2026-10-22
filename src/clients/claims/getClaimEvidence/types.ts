import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Evidence attached to a post-purchase claim. */
export interface ClaimEvidence extends ApiResponse {
	id?: string;
	type?: 'tracking_code' | 'photo' | 'invoice' | 'other';
	date_created?: string;
	file_name?: string;
}

export type GetClaimEvidenceData = {
	claimId: number;
	requestOptions?: Options;
};

export type GetClaimEvidenceClient = {
	claimId: number;
	config: MercadoPagoConfig;
};