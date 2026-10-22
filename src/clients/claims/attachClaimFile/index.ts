import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { AttachClaimFileClient, AttachedClaimFile } from './types';

/** Attach a file to a post-purchase claim. */
export default function attachClaimFile({ claimId, body, config }: AttachClaimFileClient): Promise<AttachedClaimFile> {
	const form = new FormData();
	form.append('file', body.file);

	return RestClient.fetch<AttachedClaimFile>(
		`/post-purchase/v1/claims/${encodePathParam(claimId)}/attachments`,
		{
			method: 'POST',
			headers: { Authorization: `Bearer ${config.accessToken}` },
			body: form,
			...config.options,
			isMultipart: true,
		}
	);
}