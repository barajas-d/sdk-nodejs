import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type GetTransactionIntentClient = {
	id: string;
	config: MercadoPagoConfig;
};

export type GetTransactionIntentData = {
	id: string;
	requestOptions?: Options;
};

/** The endpoint returns a transaction intent when the supplied ID is found. */
export type GetTransactionIntentResponse = {
	id?: string;
	status?: string;
};