import { RestClient } from '@utils/restClient';

import type { QRIntegratorCreateQrIntegratorConfigClient, QRIntegratorCreateQrIntegratorConfigResponse } from './types';

export default function createQrIntegratorConfig({ body, config }: QRIntegratorCreateQrIntegratorConfigClient): Promise<QRIntegratorCreateQrIntegratorConfigResponse> {
	return RestClient.fetch<QRIntegratorCreateQrIntegratorConfigResponse>('/instore/integrator', {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${config.accessToken}`,
		},
		body: JSON.stringify(body),
		...config.options
	});
}