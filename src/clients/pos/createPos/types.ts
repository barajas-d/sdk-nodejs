import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { POSRequest } from '../commonTypes';

export type POSCreateClient = {
	body: POSRequest;
	config: MercadoPagoConfig;
};

export type POSCreateData = {
	body: POSRequest;
	requestOptions?: Options;
};