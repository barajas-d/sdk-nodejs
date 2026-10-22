import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { Address } from '../commonTypes';

/** Input for retrieving a single customer address. */
export type CustomerAddressGetData = {
	customerId: string;
	addressId: string;
	requestOptions?: Options;
};

/** Internal request input, including the SDK configuration. */
export type CustomerAddressGetClient = CustomerAddressGetData & {
	config: MercadoPagoConfig;
};

/** Address returned by the API. */
export type CustomerAddressGetResponse = Address;