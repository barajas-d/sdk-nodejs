import listCustomerAddresses from './listCustomerAddresses';
import createCustomerAddress from './createCustomerAddress';
import deleteCustomerAddress from './deleteCustomerAddress';
import getCustomerAddress from './getCustomerAddress';
import updateCustomerAddress from './updateCustomerAddress';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Address } from './commonTypes';
import type { CustomerAddressListData } from './listCustomerAddresses/types';
import type { CustomerAddressCreateData } from './createCustomerAddress/types';

/** Client for customer addresses. */
export class CustomerAddress {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	listCustomerAddresses({ customerId, requestOptions }: CustomerAddressListData): Promise<Address[]> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return listCustomerAddresses({ customerId, config: this.config });
	}

	createCustomerAddress({ customerId, body, requestOptions }: CustomerAddressCreateData): Promise<Address> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createCustomerAddress({ customerId, body, config: this.config });
	}
}