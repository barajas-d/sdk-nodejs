/**
 * Request types for the confirm order operation.
 *
 * @module order/confirm/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Request body for confirming transaction amounts in an order.
 */
export declare type OrderConfirmRequest = {
  /** Array of transactions to confirm with their final amounts. */
  transactions?: Array<{
    /** Transaction ID to confirm. */
    id?: string;
    /** Final confirmed amount for this transaction. */
    amount?: string;
  }>;
};

/**
 * Internal payload forwarded to the `confirm` REST implementation.
 */
export declare type OrderConfirmClient = {
  /** Order identifier. */
  id: string;
  /** Request body with transactions to confirm. */
  body: OrderConfirmRequest;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};

/**
 * Public-facing input for {@link Order.confirm}.
 */
export declare type OrderConfirmData = {
  /** Order identifier. */
  id: string;
  /** Request body with transactions to confirm. */
  body: OrderConfirmRequest;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
};