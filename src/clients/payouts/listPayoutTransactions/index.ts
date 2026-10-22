import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { PayoutsListPayoutTransactionsClient } from './types';

export default function listPayoutTransactions({ payout_id, config }: PayoutsListPayoutTransactionsClient): Promise<unknown> {
	return RestClient.fetch<unknown>(
		`/v1/payouts/${encodePathParam(payout_id)}/transactions`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}