/**
 * Request types for the refund order operation.
 *
 * @module order/refund/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Transaction details for a partial refund.
 */
export declare type RefundTransaction = {
  /** Transaction ID to refund. */
  id: string;
  /** Amount to refund from this transaction. */
  amount: string;
};

/**
 * Request body for refunding an order.
 * If empty, performs a full refund. If transactions array is provided, performs partial refund.
 */
export declare type RefundRequest = {
  /** Optional array of transactions to refund (omit for full refund). */
  transactions?: RefundTransaction[];
};

/**
 * Internal payload forwarded to the `refund` REST implementation.
 */
export declare type OrderRefundClient = {
  /** Unique order identifier. */
  id: string;
  /** Optional refund request body. If omitted, full refund is performed. */
  body?: RefundRequest;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};

/**
 * Public-facing input for {@link Order.refund}.
 */
export declare type OrderRefundData = {
  /** Unique order identifier. */
  id: string;
  /** Optional refund request body. If omitted, full refund is performed. */
  body?: RefundRequest;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
};