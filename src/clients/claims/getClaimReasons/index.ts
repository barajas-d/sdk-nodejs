import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { ClaimGetReasonsClient, ClaimReasonResponse } from './types';

export default function getClaimReasons({ reasonId, config }: ClaimGetReasonsClient): Promise<ClaimReasonResponse> {
	return RestClient.fetch<ClaimReasonResponse>(
		`/post-purchase/v1/claims/reasons/${encodePathParam(reasonId)}`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}