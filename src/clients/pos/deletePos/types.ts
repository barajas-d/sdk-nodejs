import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Internal arguments for deleting a point of sale. */
export interface POSDeleteClient {
	id: string;
	config: MercadoPagoConfig;
}

/** Arguments for deleting a point of sale. */
export interface POSDeleteData {
	id: string;
	requestOptions?: Options;
}