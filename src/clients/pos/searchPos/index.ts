import { RestClient } from '@utils/restClient';

import type { POSSearchClient, POSSearchResponse } from './types';

export default function searchPos({ options, config }: POSSearchClient): Promise<POSSearchResponse> {
	return RestClient.fetch<POSSearchResponse>(
		'/pos',
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			queryParams: {
				...options
			},
			...config.options
		}
	);
}