import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { GetClaimFileClient, ClaimFile } from './types';

/** Get JSON metadata for a claim attachment. */
export default function getClaimFile({ claimId, fileName, config }: GetClaimFileClient): Promise<ClaimFile> {
	return RestClient.fetch<ClaimFile>(
		`/post-purchase/v1/claims/${encodePathParam(claimId)}/attachments/${encodePathParam(fileName)}`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}