import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

/** Metadata for a file attached to a claim. */
export interface ClaimFile extends ApiResponse {
	file_id?: string;
	file_name?: string;
	content_type?: string;
}

export interface GetClaimFileClient {
	claimId: number;
	fileName: string;
	config: MercadoPagoConfig;
}

export interface GetClaimFileData {
	claimId: number;
	fileName: string;
	requestOptions?: Options;
}