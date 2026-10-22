import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Parameters for downloading an attached claim file. */
export interface DownloadClaimFileData {
	claimId: number;
	fileName: string;
	requestOptions?: Options;
}

/** Parameters forwarded to the claim file download operation. */
export interface DownloadClaimFileClient extends Omit<DownloadClaimFileData, 'requestOptions'> {
	config: MercadoPagoConfig;
}

/** Raw downloaded file content and HTTP response metadata. */
export interface DownloadedClaimFile {
	data: ArrayBuffer;
	api_response: {
		status: number;
		headers: Record<string, string[]>;
	};
}