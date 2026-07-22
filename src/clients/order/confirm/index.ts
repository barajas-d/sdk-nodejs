/**
 * Implementation of the order confirmation operation.
 *
 * Sends a POST request to `/v1/orders/:id/confirm` to confirm transaction
 * amounts in an order. This endpoint is only supported for instore QR payment type.
 *
 * @module clients/order/confirm
 */

import { RestClient } from '@utils/restClient';

import type { OrderConfirmClient } from './types';
import type { OrderResponse } from '../commonTypes';

/**
 * Confirm transaction amounts in an order via the MercadoPago API.
 *
 * @returns The confirmed order with updated transaction amounts.
 */
export default function confirm({ id, body, config }: OrderConfirmClient): Promise<OrderResponse> {
	const headers: Record<string, string> = {
		'Authorization': `Bearer ${config.accessToken}`
	};

	// Add X-Idempotency-Key if provided in body
	if (body.idempotency_key) {
		headers['X-Idempotency-Key'] = body.idempotency_key;
	}

	// Add X-Product-ID if provided in body
	if (body.product_id) {
		headers['X-Product-ID'] = body.product_id;
	}

	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${id}/confirm`,
		{
			headers,
			body: JSON.stringify(body),
			method: 'POST',
			...config.options
		}
	);
}