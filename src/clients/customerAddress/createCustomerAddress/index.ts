import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { CustomerAddressCreateClient } from './types';
import type { Address } from '../commonTypes';

export default function createCustomerAddress({ customerId, body, config }: CustomerAddressCreateClient): Promise<Address> {
	return RestClient.fetch<Address>(
		`/v1/customers/${encodePathParam(customerId)}/addresses`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}