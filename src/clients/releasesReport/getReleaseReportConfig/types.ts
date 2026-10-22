import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportConfig } from '../commonTypes';

export type GetReleaseReportConfigClient = {
	config: MercadoPagoConfig;
};

export type GetReleaseReportConfigData = {
	requestOptions?: Options;
};

export type GetReleaseReportConfigResponse = ReportConfig;