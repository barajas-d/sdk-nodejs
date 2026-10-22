import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportConfig } from '../commonTypes';

export type UpdateReleaseReportConfigClient = {
	config: MercadoPagoConfig;
	body: ReportConfig;
};

export type UpdateReleaseReportConfigData = {
	body: ReportConfig;
	requestOptions?: Options;
};