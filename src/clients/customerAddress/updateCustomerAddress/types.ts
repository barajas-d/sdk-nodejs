import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { Address } from '../commonTypes';

/** Parameters for updating a customer's address. */
export type CustomerAddressUpdateData = {
	customerId: string;
	addressId: string;
	body: Address;
	requestOptions?: Options;
};

/** Parameters forwarded to the customer address update operation. */
export type CustomerAddressUpdateClient = Omit<CustomerAddressUpdateData, 'requestOptions'> & {
	config: MercadoPagoConfig;
};