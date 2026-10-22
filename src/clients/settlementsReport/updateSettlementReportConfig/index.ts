import { RestClient } from '@utils/restClient';

import type { UpdateSettlementReportConfigClient, ReportConfig } from './types';

/** Update the settlements report configuration. */
export default function updateSettlementReportConfig({ body, config }: UpdateSettlementReportConfigClient): Promise<ReportConfig> {
	return RestClient.fetch<ReportConfig>(
		'/v1/account/settlement_report/config',
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