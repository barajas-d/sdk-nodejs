import { RestClient } from '@utils/restClient';

import type { UpdateReleaseReportConfigClient, UpdateReleaseReportConfigResponse } from './types';

export default function updateReleaseReportConfig({ body, config }: UpdateReleaseReportConfigClient): Promise<UpdateReleaseReportConfigResponse> {
	return RestClient.fetch<UpdateReleaseReportConfigResponse>(
		'/v1/account/release_report/config',
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}