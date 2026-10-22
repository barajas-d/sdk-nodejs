import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { GetClaimHistoryClient, ClaimHistoryEntry } from './types';

/** Get the status history of a post-purchase claim. */
export default function getClaimHistory({ claimId, config }: GetClaimHistoryClient): Promise<ClaimHistoryEntry[]> {
	return RestClient.fetch<ClaimHistoryEntry[]>(
		`/post-purchase/v1/claims/${encodePathParam(claimId)}/status_history`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}