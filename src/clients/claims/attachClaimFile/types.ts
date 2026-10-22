import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Multipart request body for attaching a file to a claim. */
export interface AttachClaimFileBody {
	file: Blob;
}

/** Successful file attachment response. */
export interface ClaimFileAttachment extends ApiResponse {
	file_id: string;
	file_name: string;
}

export interface AttachClaimFileData {
	claimId: number;
	body: AttachClaimFileBody;
	requestOptions?: Options;
}

export interface AttachClaimFileClient {
	claimId: number;
	body: AttachClaimFileBody;
	config: MercadoPagoConfig;
}