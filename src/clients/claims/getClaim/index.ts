import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { ClaimGetClient } from './types';
import type { ClaimResponse } from '../commonTypes';

export default function getClaim({ claimId, config }: ClaimGetClient): Promise<ClaimResponse> {
	return RestClient.fetch<ClaimResponse>(
		`/post-purchase/v1/claims/${encodePathParam(claimId)}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}