/**
 * Refund client for the MercadoPago API.
 *
 * Provides a method to refund payments, supporting both full and partial
 * refunds. Extends MPBase to follow the existing client patterns in the SDK.
 *
 * @module refund
 */

import MPBase from '@src/MPBase';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/**
 * Request parameters for creating a refund.
 */
export interface RefundCreateRequest {
	/** The payment ID to refund. */
	payment_id: number | string;
	/** Optional amount for partial refund. If not provided, performs full refund. */
	amount?: number;
}

/**
 * Response returned after creating a refund.
 */
export interface RefundResponse {
	/** Unique refund identifier. */
	id?: number;
	/** Identifier of the payment that was refunded. */
	payment_id?: number;
	/** Amount refunded. */
	amount?: number;
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
	/** Refund mode (e.g. 'standard'). */
	refund_mode?: string;
	/** Adjustment amount applied. */
	adjustment_amount?: number;
	/** Current status of the refund. */
	status?: string;
	/** Amount actually refunded to the payer. */
	amount_refunded_to_payer?: number;
}

/**
 * Client for MercadoPago refund operations.
 *
 * Extends MPBase to follow the existing SDK patterns and provides
 * methods to create both full and partial refunds.
 */
export class Refund extends MPBase {
	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		super(mercadoPagoConfig);
	}

	/**
	 * Create a refund for a payment.
	 *
	 * When amount is provided, creates a partial refund for that amount.
	 * When amount is omitted, creates a full refund of the entire payment.
	 *
	 * @param payment_id - The ID of the payment to refund
	 * @param amount - Optional amount for partial refund
	 * @returns Promise resolving to the refund response
	 *
	 * @example
	 * ```typescript
	 * // Full refund
	 * const refund = await client.refund.refund({ payment_id: 123456789 });
	 *
	 * // Partial refund
	 * const partialRefund = await client.refund.refund({ 
	 *   payment_id: 123456789, 
	 *   amount: 50.00 
	 * });
	 * ```
	 */
	async refund({ payment_id, amount }: RefundCreateRequest): Promise<RefundResponse> {
		const body: Record<string, unknown> = {};
		
		// Only include amount in body if provided (for partial refund)
		if (amount !== undefined) {
			body.amount = amount;
		}

		return this.post<RefundResponse>({
			path: `/v1/payments/${payment_id}/refunds`,
			body: Object.keys(body).length > 0 ? body : undefined,
		});
	}
}