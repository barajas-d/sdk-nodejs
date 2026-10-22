import { RestClient } from '@utils/restClient';

import type { EnableReleaseReportScheduleClient } from './types';

export default function enableReleaseReportSchedule({ config }: EnableReleaseReportScheduleClient): Promise<void> {
	return RestClient.fetch<void>(
		'/v1/account/release_report/schedule',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}