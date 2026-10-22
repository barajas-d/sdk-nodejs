import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { ApiResponse } from '@src/types';
import type { SendClaimMessageClient } from './types';

export default function sendClaimMessage({ claimId, applicationId, body, config }: SendClaimMessageClient): Promise<ApiResponse> {
	return RestClient.fetch<ApiResponse>(`/post-purchase/v1/claims/${encodePathParam(claimId)}/actions/send-message`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${config.accessToken}`,
		},
		body: JSON.stringify(body),
		...(applicationId !== undefined ? { queryParams: { application_id: applicationId } } : {}),
		...config.options,
	});
}