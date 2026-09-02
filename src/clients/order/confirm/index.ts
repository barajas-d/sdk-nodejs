/**
 * Implementation of the order confirm operation.
 *
 * Sends a POST request to `/v1/orders/:id/confirm` to confirm the
 * final amounts for transactions in an instore QR payment order.
 *
 * @module order/confirm
 */

import { RestClient } from '@utils/restClient';

import type { OrderConfirmClient } from './types';
import type { OrderResponse } from '../commonTypes';

/**
 * Confirm transaction amounts in an order.
 *
 * This endpoint is only supported for instore QR payment type and allows
 * confirming the final amounts for transactions that were previously created
 * in the order.
 *
 * @returns The updated order with confirmed transaction amounts.
 */
export default function confirm({ id, body, config }: OrderConfirmClient): Promise<OrderResponse> {
	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${id}/confirm`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			body: JSON.stringify(body),
			method: 'POST',
			...config.options
		}
	);
}