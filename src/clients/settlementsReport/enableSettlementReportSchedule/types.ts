import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type EnableSettlementReportScheduleClient = {
	config: MercadoPagoConfig;
};

export type EnableSettlementReportScheduleData = {
	requestOptions?: Options;
};