import { RestClient } from '@utils/restClient';
import type { ChargebackUpdateChargebackClient, ChargebackUpdateChargebackResponse } from './types';

/** Submit chargeback documentation as JSON. */
export default function updateChargeback({ id, body, config }: ChargebackUpdateChargebackClient): Promise<ChargebackUpdateChargebackResponse> {
	return RestClient.fetch<ChargebackUpdateChargebackResponse>(
		`/v1/chargebacks/${encodeURIComponent(String(id))}`,
		{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
			body: JSON.stringify(body),
		}
	);
}
