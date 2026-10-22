import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { StoresDeleteStoreClient, StoresDeleteStoreResponse } from './types';

export default function deleteStore({ user_id, id, config }: StoresDeleteStoreClient): Promise<StoresDeleteStoreResponse> {
	return RestClient.fetch<StoresDeleteStoreResponse>(
		`/users/${encodePathParam(user_id)}/stores/${encodePathParam(id)}`,
		{
			method: 'DELETE',
			headers: { Authorization: `Bearer ${config.accessToken}` },
			...config.options
		}
	);
}