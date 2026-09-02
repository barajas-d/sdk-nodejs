/**
 * Implementation of the order refund operation.
 *
 * Sends a POST request to `/v1/orders/:id/refund` to refund an order
 * either fully (empty body) or partially (with transaction details).
 *
 * @module order/refund
 */

import { RestClient } from '@utils/restClient';

import type { OrderRefundClient } from './types';
import type { OrderResponse } from '../commonTypes';

/**
 * Refund an order by its unique identifier.
 * If no body is provided, performs a full refund.
 * If body with transactions array is provided, performs partial refund.
 *
 * @returns The order record after refund is processed.
 */
export default function refund({ id, body, config }: OrderRefundClient): Promise<OrderResponse> {
	const requestBody = body ? JSON.stringify(body) : JSON.stringify({});

	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${id}/refund`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: requestBody,
			method: 'POST',
			...config.options
		}
	);
}