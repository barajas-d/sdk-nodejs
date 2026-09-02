/**
 * Implementation of the simulate order event operation.
 *
 * Sends a POST request to `/v1/orders/:orderId/events` to simulate
 * an event on an order and change its status. This resource is only
 * enabled for inStore point orders.
 *
 * @module clients/order/simulateEvent
 */

import { RestClient } from '@utils/restClient';

import type { OrderSimulateEventClient } from './types';

/**
 * Simulate an event on an order to change its status.
 *
 * @returns Promise that resolves when the event is successfully simulated (204 No Content).
 */
export default function simulateEvent({ orderId, body, config }: OrderSimulateEventClient): Promise<void> {
	return RestClient.fetch<void>(
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