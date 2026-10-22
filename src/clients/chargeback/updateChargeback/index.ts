import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { ChargebackUpdateChargebackClient, ChargebackUpdateChargebackResponse } from './types';

export default function updateChargeback({ id, body, config }: ChargebackUpdateChargebackClient): Promise<ChargebackUpdateChargebackResponse> {
	return RestClient.fetch<ChargebackUpdateChargebackResponse>(
		`/v1/chargebacks/${encodePathParam(id)}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}