import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type EnableReleaseReportScheduleClient = {
	config: MercadoPagoConfig;
};

export type EnableReleaseReportScheduleData = {
	requestOptions?: Options;
};