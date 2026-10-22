import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Parameters accepted by the getStore operation. */
export type StoreGetData = {
	id: string;
	requestOptions?: Options;
};

/** Internal getStore request parameters. */
export type StoreGetClient = {
	id: string;
	config: MercadoPagoConfig;
};