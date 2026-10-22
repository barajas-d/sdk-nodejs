import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { ApiResponse } from '@src/types';
import type { RequestClaimMediationClient } from './types';

/** Requests mediation for a claim without a request body. */
export default function requestClaimMediation({ claimId, config }: RequestClaimMediationClient): Promise<ApiResponse> {
	return RestClient.fetch<ApiResponse>(
		`/post-purchase/v1/claims/${encodePathParam(claimId)}/actions/open-dispute`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}