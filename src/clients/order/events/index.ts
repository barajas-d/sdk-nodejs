/**
 * Simulate a Point order status -- sends `POST /v1/orders/{order_id}/events`.
 *
 * @module clients/order/events
 */

import { RestClient } from '@src/utils/restClient';
import type { OrderEventsClient, OrderEventsResponse } from './types';

/**
 * Simulate a final status for a Point order created with test credentials.
 *
 * @returns The SDK HTTP metadata envelope for the 204 No Content response.
 */
export default function events({ id, body, config }: OrderEventsClient): Promise<OrderEventsResponse> {
	if (body.installments !== undefined &&
		(body.payment_method_type !== 'credit_card' ||
			!Number.isInteger(body.installments) || body.installments < 1)) {
		throw new Error('Installments must be a positive integer for credit_card payments');
	}

	return RestClient.fetch<OrderEventsResponse>(
		`/v1/orders/${id}/events`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
