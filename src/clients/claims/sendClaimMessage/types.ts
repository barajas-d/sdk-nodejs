import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** JSON payload sent to a claim's message thread. */
export interface SendMessageRequest {
	message: string;
	attachments?: string[];
}

/** Parameters supplied to the claim message operation. */
export interface SendClaimMessageData {
	claimId: number;
	applicationId?: string;
	body: SendMessageRequest;
	requestOptions?: Options;
}

/** Internal request parameters for the claim message operation. */
export interface SendClaimMessageClient {
	claimId: number;
	applicationId?: string;
	body: SendMessageRequest;
	config: MercadoPagoConfig;
}