import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Parameters for requesting mediation on a claim. */
export interface RequestClaimMediationData {
	claimId: number;
	requestOptions?: Options;
}

/** Internal parameters for the mediation request. */
export interface RequestClaimMediationClient {
	claimId: number;
	config: MercadoPagoConfig;
}