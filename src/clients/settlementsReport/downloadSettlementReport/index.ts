import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { DownloadSettlementReportClient, DownloadSettlementReportData, DownloadSettlementReportResponse } from './types';

export default function downloadSettlementReport({ fileName, config }: DownloadSettlementReportClient & DownloadSettlementReportData): Promise<DownloadSettlementReportResponse> {
	return RestClient.fetch<DownloadSettlementReportResponse>(`/v1/account/settlement_report/${encodePathParam(fileName)}`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${config.accessToken}` },
		...config.options,
		responseType: 'text',
	});
}