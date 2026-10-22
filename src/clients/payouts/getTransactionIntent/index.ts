import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type GetTransactionIntentClient = {
	id: string;
	config: MercadoPagoConfig;
};

export type GetTransactionIntentData = {
	id: string;
	requestOptions?: Options;
};

export default function getTransactionIntent({ id, config }: GetTransactionIntentClient): Promise<unknown> {
	return RestClient.fetch<unknown>(`/v1/transaction-intents/${encodePathParam(id)}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${config.accessToken}`
		},
		...config.options
	});
}
