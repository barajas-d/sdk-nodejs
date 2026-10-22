import { RestClient } from '@src/utils/restClient';
import { encodePathParam } from '@utils/path';

import type { CancelPointRefundIntentClient, CancelPointRefundIntentResponse } from './types';

export default function cancelPointRefundIntent({ deviceid, refundintentid, config }: CancelPointRefundIntentClient): Promise<CancelPointRefundIntentResponse> {
	return RestClient.fetch<CancelPointRefundIntentResponse>(
		`/point/integration-api/devices/${encodePathParam(deviceid)}/refund/${encodePathParam(refundintentid)}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}