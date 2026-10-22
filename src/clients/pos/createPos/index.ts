import { RestClient } from '@utils/restClient';

import type { POSCreateClient } from './types';
import type { POS } from '../commonTypes';

export default function createPos({ body, config }: POSCreateClient): Promise<POS> {
	return RestClient.fetch<POS>(
		'/pos',
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