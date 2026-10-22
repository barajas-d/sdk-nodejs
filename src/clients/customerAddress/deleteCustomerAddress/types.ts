import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type CustomerAddressDeleteClient = {
	customerId: string;
	addressId: string;
	config: MercadoPagoConfig;
};

export type CustomerAddressDeleteData = {
	customerId: string;
	addressId: string;
	requestOptions?: Options;
};