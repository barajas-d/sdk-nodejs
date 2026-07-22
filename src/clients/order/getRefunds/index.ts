/**
 * Implementation of the get order refunds operation.
 *
 * Sends a GET request to `/v1/orders/:order_id/refund` to retrieve
 * refunds associated with an order.
 *
 * @module clients/order/getRefunds
 */

import { RestClient } from '@utils/restClient';

import type { OrderGetRefundsClient, OrderRefundListResponse } from './types';

/**
 * Retrieve refunds of an order by its unique identifier.
 *
 * @returns A list of refunds associated with the order.
 */
export default function getRefunds({ orderId, config }: OrderGetRefundsClient): Promise<OrderRefundListResponse> {
	const headers: Record<string, string> = {
		'Authorization': `Bearer ${config.accessToken}`
	};

	// Add X-Idempotency-Key header if provided in request options
	if (config.options?.idempotencyKey) {
		headers['X-Idempotency-Key'] = config.options.idempotencyKey;
	}

	// Add X-Product-ID header if provided in request options
	if (config.options?.productId) {
		headers['X-Product-ID'] = config.options.productId;
	}

	return RestClient.fetch<OrderRefundListResponse>(
		`/v1/orders/${orderId}/refund`,
		{
			method: 'GET',
			headers,
			...config.options
		}
	);
}