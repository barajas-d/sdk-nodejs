import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { GetClaimMessagesClient, ClaimMessage } from './types';

export default function getClaimMessages({ claimId, config }: GetClaimMessagesClient): Promise<ClaimMessage[]> {
	return RestClient.fetch<ClaimMessage[]>(
		`/post-purchase/v1/claims/${encodePathParam(claimId)}/messages`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}