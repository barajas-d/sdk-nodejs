import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportConfig } from '../commonTypes';

export type CreateReleaseReportConfigClient = {
	config: MercadoPagoConfig;
	body: ReportConfig;
};

export type CreateReleaseReportConfigData = {
	body: ReportConfig;
	requestOptions?: Options;
};