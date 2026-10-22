import { RestClient } from '@src/utils/restClient';
import { encodePathParam } from '@utils/path';
import type { DownloadReleaseReportClient, DownloadReleaseReportResponse } from './types';

/** Download a generated releases report as CSV. */
export default function downloadReleaseReport({ fileName, config }: DownloadReleaseReportClient): Promise<DownloadReleaseReportResponse> {
	return RestClient.fetch<DownloadReleaseReportResponse>(
		`/v1/account/release_report/${encodePathParam(fileName)}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
				Accept: 'text/csv',
			},
			...config.options,
			responseType: 'text',
		}
	);
}