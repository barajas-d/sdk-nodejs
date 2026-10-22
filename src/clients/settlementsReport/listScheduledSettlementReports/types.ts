import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';
import type { Pagination, ReportEntry } from '../commonTypes';

export type ListScheduledSettlementReportsClient = {
	config: MercadoPagoConfig;
};

export type ListScheduledSettlementReportsData = {
	requestOptions?: Options;
};

export interface ReportListResult extends ApiResponse {
	paging?: Pagination;
	results?: ReportEntry[];
}