/**
 * Refund order operation.
 *
 * Sends a `POST /v1/orders/:id/refund` request to perform a full or partial
 * refund of transactions associated with an order.
 *
 * @module order/refund
 */
import { RestClient } from '@utils/restClient';
import type { OrderRefundClient } from './types';
import type { OrderResponse } from '../commonTypes';

/**
 * Refund an order either fully or partially.
 *
 * For full refund, send an empty request body.
 * For partial refund, include transactions array with specific transaction IDs and amounts.
 *
 * @returns The updated order with refund information.
 */
export default function refund({ id, body, config }: OrderRefundClient): Promise<OrderResponse> {
	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${id}/refund`,
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: body ? JSON.stringify(body) : undefined,
			...config.options
		}
	);
}