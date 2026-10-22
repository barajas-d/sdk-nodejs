import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Request data for retrieving a claim reason. */
export type ClaimGetClaimReasonsData = {
	reasonId: string;
	requestOptions?: Options;
};

/** Internal client data for retrieving a claim reason. */
export type ClaimGetClaimReasonsClient = {
	reasonId: string;
	config: MercadoPagoConfig;
};

/** The reason metadata returned by the claims API. */
export type ClaimReasonResponse = {
	id: string;
	description?: string;
};