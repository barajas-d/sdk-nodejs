/**
 * Request and response types for simulating Point order status events.
 *
 * @module clients/order/events/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Payment methods available for Point order event simulation. */
type OrderEventPaymentMethodId =
	| 'amex' | 'master' | 'visa' | 'debmaster' | 'debvisa'
	| 'argencard' | 'cabal' | 'cencosud' | 'cmr' | 'diners'
	| 'naranja' | 'debcabal' | 'elo' | 'hipercard' | 'voucher_card';

/** Failure reasons supported by the Point simulation endpoint. */
type OrderEventFailureDetail =
	| 'bad_filled_card_data' | 'required_call_for_authorize' | 'card_disabled'
	| 'high_risk' | 'insufficient_amount' | 'invalid_installments'
	| 'max_attempts_exceeded' | 'rejected_other_reason' | 'processing_error';

type OrderEventStatus =
	| { status: 'processed'; payment_method_id?: OrderEventPaymentMethodId; status_detail?: 'accredited' }
	| { status: 'failed'; payment_method_id?: OrderEventPaymentMethodId; status_detail?: OrderEventFailureDetail }
	| { status: 'canceled' | 'expired' | 'refunded' | 'action_required'; payment_method_id?: never; status_detail?: never };

type OrderEventPaymentMethod =
	| { payment_method_type: 'credit_card'; installments?: number }
	| { payment_method_type?: 'debit_card' | 'qr' | 'voucher_card'; installments?: never };

/** JSON body sent to POST /v1/orders/{order_id}/events. */
export declare type OrderEventsRequest = OrderEventStatus & OrderEventPaymentMethod;

/** Internal parameters passed to the Point order events REST operation. */
export declare type OrderEventsClient = {
	/** Identifier of the order whose status is to be simulated. */
	id: string;
	/** JSON status simulation request. */
	body: OrderEventsRequest;
	/** SDK configuration including the access token. */
	config: MercadoPagoConfig;
};

/** Public input for the Point order events operation. */
export declare type OrderEventsData = {
	/** Identifier of the order whose status is to be simulated. */
	id: string;
	/** JSON status simulation request. */
	body: OrderEventsRequest;
	/** Per-call timeout, idempotency key, and other request options. */
	requestOptions?: Options;
};

/** HTTP metadata returned by the SDK for a successful 204 No Content response. */
export declare type OrderEventsResponse = ApiResponse;
