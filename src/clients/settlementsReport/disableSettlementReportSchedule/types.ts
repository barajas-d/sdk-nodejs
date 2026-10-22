import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type DisableSettlementReportScheduleClient = {
	config: MercadoPagoConfig;
};

export type DisableSettlementReportScheduleData = {
	requestOptions?: Options;
};