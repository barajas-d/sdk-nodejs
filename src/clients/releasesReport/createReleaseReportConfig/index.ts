import { RestClient } from '@utils/restClient';

import type { ReleasesReportCreateReleaseReportConfigClient, ReportConfig } from './types';

export default function createReleaseReportConfig({ body, config }: ReleasesReportCreateReleaseReportConfigClient): Promise<ReportConfig> {
	return RestClient.fetch<ReportConfig>(
		'/v1/account/release_report/config',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}