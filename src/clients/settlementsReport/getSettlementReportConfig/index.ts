import { RestClient } from '@utils/restClient';

import type { SettlementsReportGetSettlementReportConfigClient, SettlementsReportGetSettlementReportConfigResponse } from './types';

export default function getSettlementReportConfig({ config }: SettlementsReportGetSettlementReportConfigClient): Promise<SettlementsReportGetSettlementReportConfigResponse> {
	return RestClient.fetch<SettlementsReportGetSettlementReportConfigResponse>('/v1/account/settlement_report/config', {
		method: 'GET',
		headers: { Authorization: `Bearer ${config.accessToken}` },
		...config.options,
	});
}