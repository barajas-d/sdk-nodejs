import { RestClient } from '@utils/restClient';

import type { SettlementReportGetClient, SettlementReportGetResponse } from './types';

/** Retrieve the list of settlement reports. */
export default function getSettlementReport({ config }: SettlementReportGetClient): Promise<SettlementReportGetResponse> {
	return RestClient.fetch<SettlementReportGetResponse>('/v1/account/settlement_report', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${config.accessToken}`,
		},
		...config.options,
	});
}