import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Request payload for updating the settlements report configuration. */
export type ReportConfig = {
	columns?: string[];
	frequency?: string;
	sftp?: {
		host?: string;
		port?: number;
		username?: string;
		password?: string;
		path?: string;
	};
};

export type UpdateSettlementReportConfigData = {
	body: ReportConfig;
	requestOptions?: Options;
};

export type UpdateSettlementReportConfigClient = UpdateSettlementReportConfigData & {
	config: MercadoPagoConfig;
};

export type UpdateSettlementReportConfigResponse = ReportConfig & ApiResponse;