import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { DownloadClaimFileClient, DownloadedClaimFile } from './types';

/** Download the raw bytes of an attached claim file. */
export default function downloadClaimFile({ claimId, fileName, config }: DownloadClaimFileClient): Promise<DownloadedClaimFile> {
	return RestClient.fetch<DownloadedClaimFile>(
		`/post-purchase/v1/claims/${encodePathParam(claimId)}/attachments/${encodePathParam(fileName)}/download`,
		{
			method: 'GET',
			headers: { Authorization: `Bearer ${config.accessToken}` },
			...config.options,
			responseType: 'arrayBuffer',
		}
	);
}
