import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportListResult } from '../commonTypes';

export type ReleaseReportGetClient = {
	config: MercadoPagoConfig;
};

export type ReleaseReportGetData = {
	requestOptions?: Options;
};

export type ReleaseReportGetResponse = ReportListResult;