import { RestClient } from '@src/utils/restClient';
import { encodePathParam } from '@utils/path';

import type { TerminalsCreatePointRefundIntentClient, PointRefundIntentCreateResponse } from './types';

export default function createPointRefundIntent({ deviceid, body, config }: TerminalsCreatePointRefundIntentClient): Promise<PointRefundIntentCreateResponse> {
	return RestClient.fetch<PointRefundIntentCreateResponse>(
		`/point/integration-api/devices/${encodePathParam(deviceid)}/refund`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options,
		}
	);
}