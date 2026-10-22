import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { StoresCreateStoreClient } from './types';
import type { Store } from '../commonTypes';

export default function createStore({ userId, body, config }: StoresCreateStoreClient): Promise<Store> {
	return RestClient.fetch<Store>(
		`/users/${encodePathParam(userId)}/stores`,
		{
			method: 'POST',
			headers: { Authorization: `Bearer ${config.accessToken}` },
			body: JSON.stringify(body),
			...config.options
		}
	);
}