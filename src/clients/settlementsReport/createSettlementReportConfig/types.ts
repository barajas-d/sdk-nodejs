import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportConfig } from '../commonTypes';

export type SettlementReportConfigCreateClient = {
	config: MercadoPagoConfig;
	body: ReportConfig;
};

export type SettlementReportConfigCreateData = {
	body: ReportConfig;
	requestOptions?: Options;
};