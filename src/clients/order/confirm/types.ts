/**
 * Request types for the order confirm operation.
 *
 * @module order/confirm/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Request body for confirming an order.
 * Contains the transaction amounts to confirm.
 */
export declare type OrderConfirmRequest = {
  /** Total amount to confirm for the order */
  total_amount?: string;
  /** Detailed transaction amounts breakdown */
  transactions?: {
    /** Array of payment amounts to confirm */
    payments?: Array<{
      /** Payment identifier */
      id?: string;
      /** Amount to confirm for this payment */
      amount?: string;
    }>;
  };
};

/**
 * Internal parameters for the confirm function.
 */
export declare type OrderConfirmClient = {
  /** Order identifier to confirm */
  orderId: string;
  /** Request body containing amounts to confirm */
  body: OrderConfirmRequest;
  /** Idempotency key for safe retries */
  idempotencyKey?: string;
  /** Product ID header */
  productId?: string;
  /** SDK configuration with access token and HTTP options */
  config: MercadoPagoConfig;
};

/**
 * Public input for {@link Order.confirm}.
 */
export declare type OrderConfirmData = {
  /** Order identifier to confirm */
  orderId: string;
  /** Request body containing amounts to confirm */
  body: OrderConfirmRequest;
  /** Idempotency key for safe retries */
  idempotencyKey?: string;
  /** Product ID header */
  productId?: string;
  /** Optional HTTP overrides (timeouts, etc.) */
  requestOptions?: Options;
};