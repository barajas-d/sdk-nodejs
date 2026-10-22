import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

export type UploadShippingEvidenceRequest = {
	type: 'tracking_code' | 'proof_of_delivery';
	value: string;
};

export type UploadShippingEvidenceData = {
	claimId: number;
	body: UploadShippingEvidenceRequest;
	requestOptions?: Options;
};

export type UploadShippingEvidenceClient = UploadShippingEvidenceData & {
	config: MercadoPagoConfig;
};

export type UploadShippingEvidenceResponse = ApiResponse;