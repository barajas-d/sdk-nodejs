import { RestClient } from '@utils/restClient';

import type { PreApprovalExportSubscriptionsClient, PreApprovalExportSubscriptionsResponse } from './types';

/** Export subscriptions for a collector as CSV. */
export default function exportSubscriptions({ options, config }: PreApprovalExportSubscriptionsClient): Promise<PreApprovalExportSubscriptionsResponse> {
	return RestClient.fetch<PreApprovalExportSubscriptionsResponse>(
		'/preapproval/export',
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			queryParams: { ...options },
			responseType: 'text',
			...config.options,
		}
	);
}