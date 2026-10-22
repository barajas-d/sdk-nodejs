import { RestClient } from '@utils/restClient';
import type { SearchReleaseReportsClient, SearchReleaseReportsResponse } from './types';

/** Search releases reports by date range. */
export default function searchReleaseReports({ begin_date, end_date, config }: SearchReleaseReportsClient): Promise<SearchReleaseReportsResponse> {
	return RestClient.fetch<SearchReleaseReportsResponse>(
		'/v1/account/release_report/search',
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			queryParams: {
				begin_date,
				end_date,
			},
			...config.options
		}
	);
}