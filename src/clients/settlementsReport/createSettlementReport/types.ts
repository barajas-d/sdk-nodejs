import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportRequest, ReportTask } from '../commonTypes';

export type CreateSettlementReportClient = {
	config: MercadoPagoConfig;
	body: ReportRequest;
};

export type CreateSettlementReportData = {
	body: ReportRequest;
	requestOptions?: Options;
};

export type CreateSettlementReportResponse = ReportTask;