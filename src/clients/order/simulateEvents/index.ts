/**
 * Implementation of the order simulate events operation.
 *
 * Sends a POST request to `/v1/orders/:order_id/events` to simulate
 * events on an order and change its status. This is only enabled for
 * inStore point orders.
 *
 * @module clients/order/simulateEvents
 */

import { RestClient } from '@utils/restClient';

import type { OrderSimulateEventsClient } from './types';
import type { OrderResponse } from '../commonTypes';

/**
 * Simulate events on an order to change its status.
 *
 * This endpoint allows testing different order states by simulating
 * events such as payment completion, cancellation, or expiration.
 * Only available for inStore point orders.
 *
 * @returns The updated order record after event simulation.
 */
export default function simulateEvents({ orderId, body, config }: OrderSimulateEventsClient): Promise<OrderResponse> {
	return RestClient.fetch<OrderResponse>(
		`/v1/orders/${orderId}/events`,
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