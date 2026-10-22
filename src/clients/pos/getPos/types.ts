import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Parameters for retrieving a point of sale. */
export interface POSGetData {
	id: string;
	requestOptions?: Options;
}

/** Internal parameters for the GET /pos/{id} request. */
export interface POSGetClient {
	id: string;
	config: MercadoPagoConfig;
}