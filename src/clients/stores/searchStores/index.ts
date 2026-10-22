import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { StoresSearchStoresClient, StoresSearchStoresResponse } from './types';

export default function searchStores({ userId, externalId, config }: StoresSearchStoresClient): Promise<StoresSearchStoresResponse> {
	return RestClient.fetch<StoresSearchStoresResponse>(
		`/users/${encodePathParam(userId)}/stores/search`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`
			},
			...(externalId !== undefined ? { queryParams: { external_id: externalId } } : {}),
			...config.options
		}
	);
}