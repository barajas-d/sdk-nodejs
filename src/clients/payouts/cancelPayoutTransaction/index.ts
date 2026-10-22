import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { PayoutsCancelPayoutTransactionClient } from './types';

export default function cancelPayoutTransaction({ payout_id, transaction_id, config }: PayoutsCancelPayoutTransactionClient): Promise<unknown> {
	return RestClient.fetch<unknown>(
		`/v1/payouts/${encodePathParam(payout_id)}/transactions/${encodePathParam(transaction_id)}/cancel`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}