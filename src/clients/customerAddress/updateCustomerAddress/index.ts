import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { CustomerAddressUpdateClient } from './types';
import type { Address } from '../commonTypes';

export default function updateCustomerAddress({ customerId, addressId, body, config }: CustomerAddressUpdateClient): Promise<Address> {
	return RestClient.fetch<Address>(
		`/v1/customers/${encodePathParam(customerId)}/addresses/${encodePathParam(addressId)}`,
		{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}