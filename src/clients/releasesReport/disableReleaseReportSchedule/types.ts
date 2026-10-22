import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type DisableReleaseReportScheduleClient = {
	config: MercadoPagoConfig;
};

export type DisableReleaseReportScheduleData = {
	requestOptions?: Options;
};