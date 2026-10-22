import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { QROrdersConfirmCashoutQrClient, QROrdersConfirmCashoutQrResponse } from './types';

export default function confirmCashoutQr({ merchantOrderId, body, config }: QROrdersConfirmCashoutQrClient): Promise<QROrdersConfirmCashoutQrResponse> {
	return RestClient.fetch<QROrdersConfirmCashoutQrResponse>(
		`/instore/orders/${encodePathParam(merchantOrderId)}/confirmation`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}