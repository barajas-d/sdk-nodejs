import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { POSUpdateClient } from './types';
import type { POS } from '../commonTypes';

/** Update a point of sale by its identifier. */
export default function updatePos({ id, body, config }: POSUpdateClient): Promise<POS> {
	return RestClient.fetch<POS>(
		`/pos/${encodePathParam(id)}`,
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