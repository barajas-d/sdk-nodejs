import { RestClient } from '@utils/restClient';
import type { SettlementReportConfigCreateClient, SettlementReportConfigResponse } from './types';

export default function createSettlementReportConfig({ body, config }: SettlementReportConfigCreateClient): Promise<SettlementReportConfigResponse> {
	return RestClient.fetch<SettlementReportConfigResponse>('/v1/account/settlement_report/config', {
		method: 'POST',
		headers: { Authorization: `Bearer ${config.accessToken}` },
		body: JSON.stringify(body),
		...config.options,
	});
}