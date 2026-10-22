import { RestClient } from '@utils/restClient';

import type { PayoutsProcessTransactionIntentClient } from './types';

export default function processTransactionIntent({ body, config }: PayoutsProcessTransactionIntentClient): Promise<void> {
	return RestClient.fetch<void>(
		'/v1/transaction-intents/process',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}