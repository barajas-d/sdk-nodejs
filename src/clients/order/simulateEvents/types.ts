/**
 * Request and internal types for the order simulate events operation.
 *
 * @module clients/order/simulateEvents/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Request body for simulating events on an order.
 */
export declare type OrderSimulateEventsRequest = {
	/** Type of event to simulate (e.g., 'payment_completed', 'cancelled', 'expired') */
	event_type?: string;
	/** Additional event-specific parameters */
	[key: string]: any;
};

/**
 * Internal payload forwarded to the `simulateEvents` REST implementation.
 */
export declare type OrderSimulateEventsClient = {
	/** Unique order identifier assigned by MercadoPago. */
	orderId: string;
	/** Event simulation parameters. */
	body: OrderSimulateEventsRequest;
	/** SDK configuration including access token and global options. */
	config: MercadoPagoConfig;
};

/**
 * Public-facing input for {@link Order.simulateEvents}.
 */
export declare type OrderSimulateEventsData = {
	/** Unique order identifier assigned by MercadoPago. */
	orderId: string;
	/** Event simulation parameters. */
	body: OrderSimulateEventsRequest;
	/** Per-request options such as timeout or idempotency key. */
	requestOptions?: Options;
};