import { RestClient } from '@utils/restClient';
import type { SettlementsReportCreateSettlementReportClient, SettlementsReportCreateSettlementReportResponse } from './types';

export default function createSettlementReport({ body, config }: SettlementsReportCreateSettlementReportClient): Promise<SettlementsReportCreateSettlementReportResponse> {
	return RestClient.fetch<SettlementsReportCreateSettlementReportResponse>('/v1/account/settlement_report', {
		method: 'POST',
		headers: { Authorization: `Bearer ${config.accessToken}` },
		body: JSON.stringify(body),
		...config.options,
	});
}