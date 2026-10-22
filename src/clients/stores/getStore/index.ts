import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { StoreGetClient, StoreResponse } from './types';

export default function getStore({ id, config }: StoreGetClient): Promise<StoreResponse> {
	return RestClient.fetch<StoreResponse>(`/stores/${encodePathParam(id)}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${config.accessToken}`,
		},
		...config.options
	});
}