import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { GetClaimMediationResolutionsClient, MediationResolution } from './types';

export default function getClaimMediationResolutions({ claimId, config }: GetClaimMediationResolutionsClient): Promise<MediationResolution[]> {
	return RestClient.fetch<MediationResolution[]>(
		`/post-purchase/v1/claims/${encodePathParam(claimId)}/expected-resolutions`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}