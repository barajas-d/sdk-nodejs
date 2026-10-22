import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type CustomerAddressListClient = {
	customerId: string;
	config: MercadoPagoConfig;
};

export type CustomerAddressListData = {
	customerId: string;
	requestOptions?: Options;
};