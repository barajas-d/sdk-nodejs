import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Query filters for the subscription CSV export. */
export type PreApprovalExportSubscriptionsOptions = {
	collector_id: number;
	preapproval_plan_id?: string;
	status?: 'pending' | 'authorized' | 'paused' | 'cancelled';
	sort?: 'date_created' | 'last_modified';
};

export type PreApprovalExportSubscriptionsData = {
	options: PreApprovalExportSubscriptionsOptions;
	requestOptions?: Options;
};

export type PreApprovalExportSubscriptionsClient = {
	options: PreApprovalExportSubscriptionsOptions;
	config: MercadoPagoConfig;
};

/** CSV payload and HTTP metadata returned by RestClient's text mode. */
export interface PreApprovalExportSubscriptionsResponse extends ApiResponse {
	body: string;
}