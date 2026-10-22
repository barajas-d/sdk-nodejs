import { RestClient } from '@utils/restClient';

import type { DisableReleaseReportScheduleClient } from './types';

export default function disableReleaseReportSchedule({ config }: DisableReleaseReportScheduleClient): Promise<void> {
	return RestClient.fetch<void>(
		'/v1/account/release_report/schedule',
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}