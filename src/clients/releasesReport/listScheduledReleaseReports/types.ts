import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportListResult } from '../commonTypes';

export type ListScheduledReleaseReportsClient = {
	config: MercadoPagoConfig;
};

export type ListScheduledReleaseReportsData = {
	requestOptions?: Options;
};

export type ListScheduledReleaseReportsResponse = ReportListResult;