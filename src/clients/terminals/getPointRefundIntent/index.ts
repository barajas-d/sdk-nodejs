import { RestClient } from '@src/utils/restClient';
import { encodePathParam } from '@utils/path';

import type { TerminalsGetPointRefundIntentClient, PointRefundIntentResponse } from './types';

export default function getPointRefundIntent({ refundintentid, config }: TerminalsGetPointRefundIntentClient): Promise<PointRefundIntentResponse> {
	return RestClient.fetch<PointRefundIntentResponse>(
		`/point/integration-api/refund/${encodePathParam(refundintentid)}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}