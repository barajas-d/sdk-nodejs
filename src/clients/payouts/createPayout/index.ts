import { RestClient } from '@utils/restClient';

import type { PayoutsCreatePayoutClient } from './types';

export default function createPayout({ body, config }: PayoutsCreatePayoutClient): Promise<unknown> {
	return RestClient.fetch<unknown>('/v1/payouts', {
		method: 'POST',
		headers: { Authorization: `Bearer ${config.accessToken}` },
		body: JSON.stringify(body),
		...config.options
	});
}