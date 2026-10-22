import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** JSON payload for processing a payout transaction intent. */
export type PayoutsProcessTransactionIntentBody = {
	external_reference?: string;
	point_of_interaction?: {
		type?: string;
	};
	transaction?: {
		amount?: number;
		currency_id?: string;
		receiver?: object;
	};
};

export type PayoutsProcessTransactionIntentClient = {
	body: PayoutsProcessTransactionIntentBody;
	config: MercadoPagoConfig;
};

export type PayoutsProcessTransactionIntentData = {
	body: PayoutsProcessTransactionIntentBody;
	requestOptions?: Options;
};