import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

export declare type PayoutsListPayoutTransactionsClient = {
	payout_id: string;
	config: MercadoPagoConfig;
};

export declare type PayoutsListPayoutTransactionsData = {
	payout_id: string;
	requestOptions?: Options;
};

/** The OpenAPI response specifies a status but no content schema. */
export declare type PayoutsListPayoutTransactionsResponse = ApiResponse;