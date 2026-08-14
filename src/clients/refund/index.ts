/**
 * Refund client for the MercadoPago API.
 *
 * Provides methods to create full or partial refunds for payments.
 * When an amount is provided, a partial refund is created; otherwise,
 * the full payment amount is refunded.
 *
 * @module refund
 */

import { RestClient } from '@utils/restClient';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Response returned after creating a refund.
 */
export declare type RefundResponse = {
  /** Unique refund identifier. */
  id?: number;
  /** Identifier of the payment being refunded. */
  payment_id?: number;
  /** Amount being refunded. */
  amount?: number;
  /** Arbitrary key-value metadata attached to the refund. */
  metadata?: Record<string, unknown>;
  /** Source information about who initiated the refund. */
  source?: {
    /** Source identifier. */
    id?: string;
    /** Source name. */
    name?: string;
    /** Source type. */
    type?: string;
  };
  /** ISO 8601 timestamp when the refund was created. */
  date_created?: string;
  /** Unique identifier for the original transaction. */
  unique_sequence_number?: string | null;
  /** Refund mode (e.g. `standard`). */
  refund_mode?: string;
  /** Adjustment amount applied. */
  adjustment_amount?: number;
  /** Current status of the refund (e.g. `approved`, `pending`). */
  status?: string;
  /** Reason code for the refund status. */
  reason?: string;
  /** Labels associated with the refund. */
  labels?: string[];
  /** Amount refunded to the payer. */
  amount_refunded_to_payer?: number;
};

/**
 * Input data for creating a refund.
 */
export declare type RefundCreateData = {
  /** Identifier of the payment to refund. */
  payment_id: number;
  /** Optional amount to refund. If not provided, the full payment amount is refunded. */
  amount?: number;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
};

/**
 * Internal parameters for the refund implementation.
 */
declare type RefundCreateClient = {
  /** Identifier of the payment to refund. */
  payment_id: number;
  /** Optional amount to refund. */
  amount?: number;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};

/**
 * Create a full or partial refund for a payment.
 *
 * When amount is provided, creates a partial refund; otherwise, refunds
 * the full payment amount.
 */
function refund({ payment_id, amount, config }: RefundCreateClient): Promise<RefundResponse> {
  const body: { amount?: number } = {};
  
  if (amount !== undefined) {
    body.amount = amount;
  }

  return RestClient.fetch<RefundResponse>(
    `/v1/payments/${payment_id}/refunds`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
      },
      body: JSON.stringify(body),
      ...config.options
    }
  );
}

/**
 * Client facade for MercadoPago refund operations.
 */
export class Refund {
  /** SDK configuration providing credentials and HTTP options. */
  private config: MercadoPagoConfig;

  constructor(mercadoPagoConfig: MercadoPagoConfig) {
    this.config = mercadoPagoConfig;
  }

  /**
   * Create a refund for a payment.
   *
   * When `amount` is provided, creates a partial refund for that amount.
   * Otherwise, refunds the full payment amount.
   *
   * @param payment_id - Identifier of the payment to refund
   * @param amount - Optional amount to refund (partial refund if provided)
   * @param requestOptions - Per-request options such as timeout
   * @returns The created refund record
   *
   * @example
   * // Full refund
   * const fullRefund = await refund.refund({ payment_id: 123456789 });
   *
   * @example
   * // Partial refund
   * const partialRefund = await refund.refund({ 
   *   payment_id: 123456789, 
   *   amount: 25.50 
   * });
   */
  refund({ payment_id, amount, requestOptions }: RefundCreateData): Promise<RefundResponse> {
    this.config.options = { ...this.config.options, ...requestOptions };
    return refund({ payment_id, amount, config: this.config });
  }
}