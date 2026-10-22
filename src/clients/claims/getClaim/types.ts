import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { Claim } from '../commonTypes';

export type ClaimGetClient = {
	claimId: number;
	config: MercadoPagoConfig;
};

export type ClaimGetData = {
	claimId: number;
	requestOptions?: Options;
};

export type ClaimGetResponse = Claim;