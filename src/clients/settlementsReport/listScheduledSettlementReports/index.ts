import { RestClient } from '@utils/restClient';

import type { ListScheduledSettlementReportsClient, ReportListResult } from './types';

export default function listScheduledSettlementReports({ config }: ListScheduledSettlementReportsClient): Promise<ReportListResult> {
	return RestClient.fetch<ReportListResult>('/v1/account/settlement_report/list', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${config.accessToken}`,
		},
		...config.options,
	});
}