import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type CancelPayoutTransactionClient = {
	payout_id: string;
	transaction_id: string;
	config: MercadoPagoConfig;
};

export type CancelPayoutTransactionData = {
	payout_id: string;
	transaction_id: string;
	requestOptions?: Options;
};