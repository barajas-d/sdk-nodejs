import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Path parameters and per-request options for downloading a releases report. */
export type DownloadReleaseReportData = {
	fileName: string;
	requestOptions?: Options;
};

/** Internal client arguments for the CSV download operation. */
export type DownloadReleaseReportClient = DownloadReleaseReportData & {
	config: MercadoPagoConfig;
};

/** A CSV report with its HTTP response metadata. */
export type DownloadReleaseReportResponse = {
	body: string;
	api_response: {
		status: number;
		headers: Record<string, string[]>;
	};
};