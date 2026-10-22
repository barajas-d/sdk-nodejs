import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportListResult } from '../commonTypes';

export type SearchReleaseReportsData = {
	begin_date?: string;
	end_date?: string;
	requestOptions?: Options;
};

export type SearchReleaseReportsClient = SearchReleaseReportsData & {
	config: MercadoPagoConfig;
};

export type SearchReleaseReportsResponse = ReportListResult;