import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { StoresUpdateStoreClient } from './types';
import type { Store } from '../commonTypes';

export default function updateStore({ user_id, id, body, config }: StoresUpdateStoreClient): Promise<Store> {
	return RestClient.fetch<Store>(
		`/users/${encodePathParam(user_id)}/stores/${encodePathParam(id)}`,
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