import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { GetClaimEvidenceClient, ClaimEvidence } from './types';

/** Retrieves the evidence submitted for a claim. */
export default function getClaimEvidence({ claimId, config }: GetClaimEvidenceClient): Promise<ClaimEvidence[]> {
	return RestClient.fetch<ClaimEvidence[]>(
		`/post-purchase/v1/claims/${encodePathParam(claimId)}/evidences`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}