import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { GetReleaseReportTaskClient, GetReleaseReportTaskResponse } from './types';

/** Retrieve the current state of a releases report generation task. */
export default function getReleaseReportTask({ taskId, config }: GetReleaseReportTaskClient): Promise<GetReleaseReportTaskResponse> {
	return RestClient.fetch<GetReleaseReportTaskResponse>(
		`/v1/account/release_report/task/${encodePathParam(taskId)}`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}