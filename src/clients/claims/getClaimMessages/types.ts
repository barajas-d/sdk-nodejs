import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

/** A message in a post-purchase claim thread. */
export interface ClaimMessage extends ApiResponse {
	id: number;
	message?: string;
	date_created?: string;
}

export type GetClaimMessagesData = {
	claimId: number;
	requestOptions?: Options;
};

export type GetClaimMessagesClient = {
	claimId: number;
	config: MercadoPagoConfig;
};