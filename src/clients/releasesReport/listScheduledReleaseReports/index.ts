import { RestClient } from '@utils/restClient';

import type { ListScheduledReleaseReportsClient, ReportListResult } from './types';

export default function listScheduledReleaseReports({ config }: ListScheduledReleaseReportsClient): Promise<ReportListResult> {
	return RestClient.fetch<ReportListResult>(
		'/v1/account/release_report/list',
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}