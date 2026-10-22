import { RestClient } from '@utils/restClient';

import type { QRIntegratorGetQrIntegratorConfigClient, QRIntegratorConfigResponse } from './types';

export default function getQrIntegratorConfig({ config }: QRIntegratorGetQrIntegratorConfigClient): Promise<QRIntegratorConfigResponse> {
	return RestClient.fetch<QRIntegratorConfigResponse>('/instore/integrator', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${config.accessToken}`,
		},
		...config.options
	});
}