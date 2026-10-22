import { RestClient } from '@utils/restClient';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ReportListResult } from '../commonTypes';

export default function getReleaseReport({ config }: { config: MercadoPagoConfig }): Promise<ReportListResult> {
	return RestClient.fetch<ReportListResult>(
		'/v1/account/release_report',
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}