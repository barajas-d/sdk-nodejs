import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Parameters for downloading a settlements report CSV file. */
export type DownloadSettlementReportData = {
	fileName: string;
	requestOptions?: Options;
};

/** CSV content and HTTP metadata returned by the report download. */
export type DownloadSettlementReportResponse = ApiResponse & {
	body: string;
};

export type DownloadSettlementReportClient = {
	config: MercadoPagoConfig;
	(data: DownloadSettlementReportData): Promise<DownloadSettlementReportResponse>;
};