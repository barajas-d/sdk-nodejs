import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { ReportListResult } from '../listScheduledSettlementReports/types';

/** Parameters for searching settlement reports. */
export type SearchSettlementReportsData = {
	begin_date?: string;
	end_date?: string;
	requestOptions?: Options;
};

/** Internal arguments for the search operation. */
export type SearchSettlementReportsClient = SearchSettlementReportsData & {
	config: MercadoPagoConfig;
};

export type SearchSettlementReportsResponse = ReportListResult;