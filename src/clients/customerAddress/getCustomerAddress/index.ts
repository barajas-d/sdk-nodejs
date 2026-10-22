import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { CustomerAddressGetClient } from './types';
import type { Address } from '../commonTypes';

/** Retrieve a customer address by customer and address ID. */
export default function getCustomerAddress({ customerId, addressId, config }: CustomerAddressGetClient): Promise<Address> {
	return RestClient.fetch<Address>(
		`/v1/customers/${encodePathParam(customerId)}/addresses/${encodePathParam(addressId)}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}