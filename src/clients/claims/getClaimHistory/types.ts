import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** An entry in a claim's status history. */
export interface ClaimHistoryEntry extends ApiResponse {
	date?: string;
	status?: string;
	stage?: string;
	changed_by?: 'buyer' | 'seller' | 'system' | 'mediator';
}

export type GetClaimHistoryData = {
	claimId: number;
	requestOptions?: Options;
};

export type GetClaimHistoryClient = GetClaimHistoryData & {
	config: MercadoPagoConfig;
};