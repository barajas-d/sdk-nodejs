/**
 * Point order status simulation request types.
 *
 * @module clients/order/events/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Point payment methods supported by the status simulation endpoint. */
export type PointEventPaymentMethodType = 'credit_card' | 'debit_card' | 'qr' | 'voucher_card';

/** Point payment method IDs supported by the status simulation endpoint. */
export type PointEventPaymentMethodId =
	| 'amex' | 'master' | 'visa' | 'debmaster' | 'debvisa'
	| 'argencard' | 'cabal' | 'cencosud' | 'cmr' | 'diners'
	| 'naranja' | 'debcabal' | 'elo' | 'hipercard' | 'voucher_card';

/** Failure reasons documented for a failed Point order simulation. */
export type PointEventFailureDetail =
	| 'bad_filled_card_data' | 'required_call_for_authorize' | 'card_disabled'
	| 'high_risk' | 'insufficient_amount' | 'invalid_installments'
	| 'max_attempts_exceeded' | 'rejected_other_reason' | 'processing_error';

/** Installments are available only with a credit card; when supplied they must be positive integers. */
/** TypeScript cannot express a positive-integer number; the events transport validates this at runtime. */
/** Omitting payment_method_type does not permit installments. This rule is specific to Point events. */
type PointEventPaymentMethod =
	| { payment_method_type: 'credit_card'; installments?: number }
	| { payment_method_type?: Exclude<PointEventPaymentMethodType, 'credit_card'>; installments?: never };

/**
 * JSON body for simulating a Point order status using test credentials only.
 * A refunded simulation requires an order that was previously processed; the
 * server, not the SDK, determines whether that remote-state precondition holds.
 * The change can take up to 10 seconds (40 seconds for action_required).
 * Further variant-specific field combinations have not been verified.
 */
export type OrderEventsRequest = PointEventPaymentMethod & (
	| {
		status: 'processed';
		payment_method_id?: PointEventPaymentMethodId;
		status_detail?: 'accredited';
	}
	| {
		status: 'failed';
		payment_method_id?: PointEventPaymentMethodId;
		status_detail?: PointEventFailureDetail;
	}
	| {
		status: 'canceled' | 'expired' | 'refunded' | 'action_required';
		payment_method_id?: never;
		status_detail?: never;
	}
);

/** Public input for simulating the status of a Point order. */
export type OrderEventsData = {
	/** Order identifier in the URL path (26-character ULID). */
	id: string;
	/** JSON request body. */
	body: OrderEventsRequest;
	/** Per-request HTTP options. */
	requestOptions?: Options;
};

/** Internal input passed to the Point events REST operation. */
export type OrderEventsClient = {
	/** Order identifier in the URL path (26-character ULID). */
	id: string;
	/** JSON request body. */
	body: OrderEventsRequest;
	/** Authentication and default HTTP options. */
	config: MercadoPagoConfig;
};

/** HTTP 204 No Content; only the SDK's HTTP metadata envelope is returned. */
export type OrderEventsResponse = ApiResponse;
