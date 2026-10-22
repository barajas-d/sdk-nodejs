import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportConfig } from '../commonTypes';

export type SettlementsReportGetSettlementReportConfigClient = {
	config: MercadoPagoConfig;
};

export type SettlementsReportGetSettlementReportConfigData = {
	requestOptions?: Options;
};

export type SettlementsReportGetSettlementReportConfigResponse = ReportConfig;