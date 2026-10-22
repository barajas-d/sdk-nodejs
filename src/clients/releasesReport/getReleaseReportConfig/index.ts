import { RestClient } from '@utils/restClient';

import type { ReleasesReportGetReleaseReportConfigClient, ReportConfig } from './types';

export default function getReleaseReportConfig({ config }: ReleasesReportGetReleaseReportConfigClient): Promise<ReportConfig> {
	return RestClient.fetch<ReportConfig>(
		'/v1/account/release_report/config',
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}