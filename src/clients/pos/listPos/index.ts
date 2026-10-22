import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { POS } from '../commonTypes';
import type { POSListClient } from './types';

/** List points of sale belonging to a user. */
export default function listPos({ user_id, config }: POSListClient): Promise<POS[]> {
	return RestClient.fetch<POS[]>(
		`/users/${encodePathParam(user_id)}/pos`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}