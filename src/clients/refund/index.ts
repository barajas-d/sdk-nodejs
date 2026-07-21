/**
 * Refund client for the MercadoPago API.
 *
 * Provides methods to create refunds for payments, supporting both full
 * refunds (when amount is not provided) and partial refunds (when a
 * specific amount is provided).
 *
 * @module refund
 */

import { RestClient } from '@utils/restClient';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Request body for creating a refund.
 */
export declare type RefundCreateRequest = {
  /** Amount to refund. If not provided, the full payment amount will be refunded. */
  amount?: number;
  /** Reason for the refund. */
  reason?: string;
  /** Additional metadata for the refund. */
  metadata?: Record<string, unknown>;
};

/**
 * Response returned after creating a refund.
 */
export declare type RefundResponse = {
  /** Unique refund identifier. */
  id?: number;
  /** Identifier of the payment being refunded. */
  payment_id?: number;
  /** Amount refunded. */
  amount?: number;
  /** Refund status (e.g. `approved`, `pending`, `rejected`). */
  status?: string;
  /** ISO 8601 timestamp when the refund was created. */
  date_created?: string;
  /** Source of the refund. */
  source?: {
    /** Source identifier. */
    id?: string;
    /** Source name. */
    name?: string;
    /** Source type. */
    type?: string;
  };
  /** Refund mode. */
  refund_mode?: string;
  /** Adjustment amount. */
  adjustment_amount?: number;
  /** Amount actually refunded to the payer. */
  amount_refunded_to_payer?: number;
};

/**
 * Public input for creating a refund.
 */
export declare type RefundCreateData = {
  /** Identifier of the payment to refund. */
  paymentId: number | string;
  /** Optional refund body. If not provided or if amount is omitted, performs a full refund. */
  body?: RefundCreateRequest;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
};

/**
 * Internal parameters for the refund function.
 */
export declare type RefundCreateClient = {
  /** Identifier of the payment to refund. */
  paymentId: number | string;
  /** Optional refund body. */
  body?: RefundCreateRequest;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
};

/**
 * Create a refund for a payment.
 *
 * Sends a `POST /v1/payments/:paymentId/refunds` request to create either
 * a full refund (when amount is not provided) or a partial refund (when
 * amount is provided).
 *
 * @param params - Refund creation parameters
 * @returns The created refund response
 */
function refund({ paymentId, body, config }: RefundCreateClient): Promise<RefundResponse> {
	return RestClient.fetch<RefundResponse>(
		`/v1/payments/${paymentId}/refunds`,
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

/**
 * Client facade for MercadoPago refund operations.
 *
 * Provides a method to refund payments either fully or partially.
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
	 * When the `amount` field is not provided in the body, or when body is
	 * omitted entirely, a full refund is performed. When `amount` is specified,
	 * a partial refund for that amount is created.
	 *
	 * @example
	 * // Full refund
	 * await refundClient.refund({ paymentId: 123456789 });
	 *
	 * @example
	 * // Partial refund
	 * await refundClient.refund({
	 *   paymentId: 123456789,
	 *   body: { amount: 50.00 }
	 * });
	 *
	 * @param params - Refund creation parameters
	 * @returns The created refund response
	 */
	refund({ paymentId, body, requestOptions }: RefundCreateData): Promise<RefundResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return refund({ paymentId, body, config: this.config });
	}
}