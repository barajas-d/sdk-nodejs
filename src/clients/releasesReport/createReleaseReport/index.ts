import { RestClient } from '@utils/restClient';

import type { ReleaseReportCreateClient, ReportTask } from './types';

export default function createReleaseReport({ body, config }: ReleaseReportCreateClient): Promise<ReportTask> {
	return RestClient.fetch<ReportTask>(
		'/v1/account/release_report',
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