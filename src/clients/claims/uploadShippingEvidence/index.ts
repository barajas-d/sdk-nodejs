import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { ClaimsUploadShippingEvidenceClient, ClaimsUploadShippingEvidenceResponse } from './types';

export default function uploadShippingEvidence({ claimId, body, config }: ClaimsUploadShippingEvidenceClient): Promise<ClaimsUploadShippingEvidenceResponse> {
	return RestClient.fetch<ClaimsUploadShippingEvidenceResponse>(
		`/post-purchase/v1/claims/${encodePathParam(claimId)}/actions/evidences`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}