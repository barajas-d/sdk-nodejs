import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { CustomerAddressListClient } from './types';
import type { Address } from '../commonTypes';

export default function listCustomerAddresses({ customerId, config }: CustomerAddressListClient): Promise<Address[]> {
	return RestClient.fetch<Address[]>(
		`/v1/customers/${encodePathParam(customerId)}/addresses`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}