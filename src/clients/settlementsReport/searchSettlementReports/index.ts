import { RestClient } from '@utils/restClient';
import type { SearchSettlementReportsClient, ReportListResult } from './types';

/** Search settlements reports by date range. */
export default function searchSettlementReports({ options, config }: SearchSettlementReportsClient): Promise<ReportListResult> {
	return RestClient.fetch<ReportListResult>(
		'/v1/account/settlement_report/search',
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			queryParams: {
				...options,
			},
			...config.options
		}
	);
}