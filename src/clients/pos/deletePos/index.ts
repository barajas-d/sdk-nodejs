import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { POSDeleteClient } from './types';
import type { POS } from '../commonTypes';

/** Delete a point of sale by ID. */
export default function deletePos({ id, config }: POSDeleteClient): Promise<POS> {
	return RestClient.fetch<POS>(
		`/pos/${encodePathParam(id)}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${config.accessToken}`
			},
			...config.options
		}
	);
}