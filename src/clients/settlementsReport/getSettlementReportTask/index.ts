import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { GetSettlementReportTaskClient } from './types';
import type { ReportTask } from '../commonTypes';

export default function getSettlementReportTask({ taskId, config }: GetSettlementReportTaskClient): Promise<ReportTask> {
	return RestClient.fetch<ReportTask>(
		`/v1/account/settlement_report/task/${encodePathParam(taskId)}`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}