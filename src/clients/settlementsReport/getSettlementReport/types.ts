import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportListResult } from '../commonTypes';

export type SettlementReportGetClient = {
	config: MercadoPagoConfig;
};

export type SettlementReportGetData = {
	requestOptions?: Options;
};

export type SettlementReportGetResponse = ReportListResult;