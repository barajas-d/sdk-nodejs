import { RestClient } from '@utils/restClient';
import type { ClaimsSearchClaimsClient, ClaimsSearchClaimsResponse } from './types';

export default function searchClaims({ options, config }: ClaimsSearchClaimsClient): Promise<ClaimsSearchClaimsResponse> {
	return RestClient.fetch<ClaimsSearchClaimsResponse>(
		'/post-purchase/v1/claims/search',
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			queryParams: options,
			...config.options
		}
	);
}
