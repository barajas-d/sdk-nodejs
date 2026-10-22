import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

/** Task status returned by the releases-report generation API. */
export interface ReportTask extends ApiResponse {
	id?: string;
	status?: 'pending' | 'in_progress' | 'done' | 'failed';
	begin_date?: string;
	end_date?: string;
	created_at?: string;
	updated_at?: string;
	download_url?: string | null;
}

export interface GetReleaseReportTaskData {
	taskId: string;
	requestOptions?: Options;
}

export interface GetReleaseReportTaskClient extends GetReleaseReportTaskData {
	config: MercadoPagoConfig;
}