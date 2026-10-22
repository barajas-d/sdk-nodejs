import { RestClient } from '@utils/restClient';

import type { EnableSettlementReportScheduleClient, EnableSettlementReportScheduleResponse } from './types';

export default function enableSettlementReportSchedule({ config }: EnableSettlementReportScheduleClient): Promise<EnableSettlementReportScheduleResponse> {
	return RestClient.fetch<EnableSettlementReportScheduleResponse>(
		'/v1/account/settlement_report/schedule',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}