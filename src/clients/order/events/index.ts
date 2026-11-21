/**
 * Point test-order status simulation: POST /v1/orders/{order_id}/events.
 *
 * This endpoint only accepts orders created with test credentials. It does not
 * generate events or interactions with a Point terminal. The status change can
 * take up to 10 seconds (up to 40 seconds for action_required). A refunded
 * simulation requires an order that was previously processed; this is a
 * server-side state precondition that the SDK cannot determine locally.
 * Additional variant-specific property constraints have not been verified.
 *
 * @module clients/order/events
 */

import { RestClient } from '@src/utils/restClient';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Statuses supported by the Point test-order simulation endpoint. */
export type PointEventStatus = 'processed' | 'canceled' | 'expired' | 'failed' | 'refunded' | 'action_required';

/** Point simulation payment method types (not general Orders payment types). */
export type PointEventPaymentMethodType = 'debit_card' | 'credit_card' | 'qr' | 'voucher_card';

/** Point simulation payment method IDs. Availability may vary by site. */
export type PointEventPaymentMethodId =
	'amex' | 'master' | 'visa' | 'debmaster' | 'debvisa' | 'argencard' |
	'cabal' | 'cencosud' | 'cmr' | 'diners' | 'naranja' | 'debcabal' |
	'elo' | 'hipercard' | 'voucher_card';

/** Failure details documented for Point status simulation. */
export type PointEventFailureDetail =
	'bad_filled_card_data' | 'required_call_for_authorize' | 'card_disabled' |
	'high_risk' | 'insufficient_amount' | 'invalid_installments' |
	'max_attempts_exceeded' | 'rejected_other_reason' | 'processing_error';

type PointEventCommon = {
	/** Optional Point payment method type. */
	payment_method_type?: PointEventPaymentMethodType;
	/** Only for credit_card; when supplied must be a positive integer. */
	installments?: number;
};

/** JSON body for Point order status simulation. */
export type PointOrderEventRequest = PointEventCommon & (
	| { status: 'processed'; payment_method_id?: PointEventPaymentMethodId; status_detail?: 'accredited' }
	| { status: 'failed'; payment_method_id?: PointEventPaymentMethodId; status_detail?: PointEventFailureDetail }
	| { status: 'canceled' | 'expired' | 'refunded' | 'action_required'; payment_method_id?: never; status_detail?: never }
);

/** Public input for Point status simulation. The id is the path order_id (ULID). */
export type OrderEventsData = {
	id: string;
	body: PointOrderEventRequest;
	requestOptions?: Options;
};

/** Internal parameters for the Point events transport. */
export type OrderEventsClient = {
	id: string;
	body: PointOrderEventRequest;
	config: MercadoPagoConfig;
};

/** Success is HTTP 204 No Content: only the SDK's HTTP metadata envelope is returned. */
export type OrderEventsResponse = ApiResponse;

/**
 * Simulate a Point order's final status using test credentials.
 * The remote service, not this client, verifies that a refunded order was
 * previously processed. A successful 204 carries no JSON response body.
 */
// The exported overload shares the public facade's credit-card-only installments constraint.
export default function events(input: import('./types').OrderEventsClient): Promise<import('./types').OrderEventsResponse>;
export default function events({ id, body, config }: OrderEventsClient): Promise<OrderEventsResponse> {
	if (!body || !['processed', 'canceled', 'expired', 'failed', 'refunded', 'action_required'].includes(body.status)) {
		throw new RangeError('Point event status is required and must be a supported status');
	}
	if (body.payment_method_id !== undefined && body.status !== 'processed' && body.status !== 'failed') {
		throw new RangeError('payment_method_id is only available for processed or failed Point events');
	}
	if (body.status_detail !== undefined && (
		(body.status === 'processed' && body.status_detail !== 'accredited') ||
		(body.status === 'failed' && ![
			'bad_filled_card_data', 'required_call_for_authorize', 'card_disabled', 'high_risk',
			'insufficient_amount', 'invalid_installments', 'max_attempts_exceeded',
			'rejected_other_reason', 'processing_error'
		].includes(body.status_detail)) ||
		(body.status !== 'processed' && body.status !== 'failed')
	)) {
		throw new RangeError('status_detail is not valid for this Point event status');
	}
	if (body.installments !== undefined) {
		if (!Number.isInteger(body.installments) || body.installments < 1) {
			throw new RangeError('installments must be a positive integer');
		}
		if (body.payment_method_type !== 'credit_card') {
			throw new RangeError('installments only apply to credit_card Point events');
		}
	}

	return RestClient.fetch<OrderEventsResponse>(
		`/v1/orders/${id}/events`,
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
