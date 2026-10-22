import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { Address } from '../commonTypes';

export type CreateCustomerAddressClient = {
	customerId: string;
	body: Address;
	config: MercadoPagoConfig;
};

export type CreateCustomerAddressData = {
	customerId: string;
	body: Address;
	requestOptions?: Options;
};