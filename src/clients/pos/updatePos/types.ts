import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { POSRequest } from '../commonTypes';

/** Arguments for the POS update request. */
export interface POSUpdateData {
	id: string;
	body: POSRequest;
	requestOptions?: Options;
}

/** Internal arguments for the POS update operation. */
export interface POSUpdateClient {
	id: string;
	body: POSRequest;
	config: MercadoPagoConfig;
}