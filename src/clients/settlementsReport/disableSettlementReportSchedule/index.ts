import { RestClient } from '@utils/restClient';

import type { DisableSettlementReportScheduleClient, DisableSettlementReportScheduleResponse } from './types';

export default function disableSettlementReportSchedule({ config }: DisableSettlementReportScheduleClient): Promise<DisableSettlementReportScheduleResponse> {
	return RestClient.fetch<DisableSettlementReportScheduleResponse>(
		'/v1/account/settlement_report/schedule',
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}