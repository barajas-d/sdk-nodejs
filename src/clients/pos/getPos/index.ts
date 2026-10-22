import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { POSGetClient } from './types';
import type { POS } from '../commonTypes';

export default function getPos({ id, config }: POSGetClient): Promise<POS> {
	return RestClient.fetch<POS>(`/pos/${encodePathParam(id)}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${config.accessToken}`
		},
		...config.options
	});
}