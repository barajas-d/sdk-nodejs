import { RestClient } from '@utils/restClient';

import type { POSSearchClient, POSSearchResponse } from './types';

/** Search registered points of sale without sending a request body. */
export default function searchPos({ options, config }: POSSearchClient): Promise<POSSearchResponse> {
	return RestClient.fetch<POSSearchResponse>('/pos', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${config.accessToken}`,
		},
		queryParams: { ...options },
		...config.options,
	});
}
