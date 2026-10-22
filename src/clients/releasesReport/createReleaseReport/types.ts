import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportTask } from '../commonTypes';

/** Date range for a one-time releases report (ISO 8601 timestamps). */
export type ReportRequest = {
	begin_date: string;
	end_date: string;
};

export type CreateReleaseReportClient = {
	config: MercadoPagoConfig;
	body: ReportRequest;
};

export type CreateReleaseReportData = {
	body: ReportRequest;
	requestOptions?: Options;
};

export type CreateReleaseReportResponse = ReportTask;