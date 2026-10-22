import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { CustomerAddressDeleteClient, CustomerAddressDeleteResponse } from './types';

/** Delete an address belonging to a customer. */
export default function deleteCustomerAddress({ customerId, addressId, config }: CustomerAddressDeleteClient): Promise<CustomerAddressDeleteResponse> {
	return RestClient.fetch<CustomerAddressDeleteResponse>(
		`/v1/customers/${encodePathParam(customerId)}/addresses/${encodePathParam(addressId)}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}