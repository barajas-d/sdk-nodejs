/**
 * Request types for simulating an order event operation.
 *
 * @module clients/order/simulateEvent/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Request body for simulating an order event.
 */
export declare type OrderSimulateEventRequest = {
  /** Event name to simulate (e.g., 'activate', 'finish', 'cancel'). */
  name?: string;
  /** Additional event-specific data. */
  data?: Record<string, unknown>;
};

/**
 * Internal payload forwarded to the `simulateEvent` REST implementation.
 */
export declare type OrderSimulateEventClient = {
  /** Order identifier. */
  orderId: string;
  /** Event simulation request body. */
  body: OrderSimulateEventRequest;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};

/**
 * Public-facing input for {@link Order.simulateEvent}.
 */
export declare type OrderSimulateEventData = {
  /** Order identifier. */
  orderId: string;
  /** Event simulation request body. */
  body: OrderSimulateEventRequest;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
};