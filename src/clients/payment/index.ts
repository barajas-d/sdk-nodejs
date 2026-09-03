/**
 * Payment API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing payments through the
 * `/v1/payments` resource. Supports creating payments, retrieving
 * payment details, searching payments, capturing authorized payments,
 * and cancelling payments.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post MercadoPago Payments API reference}
 * @module clients/payment
 */

import get from './get';
import create from './create';
import search from './search';
import capture from './capture';
import cancel from './cancel';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PaymentResponse } from './commonTypes';
import type { PaymentGetData } from './get/types';
import type { PaymentCreateData } from './create/types';
import type { PaymentSearchData, PaymentSearchResponse } from './search/types';
import type { PaymentCaptureData } from './capture/types';
import type { PaymentCancelData } from './cancel/types';

/**
 * Client for the MercadoPago Payments API.
 *
 * Exposes operations for creating, retrieving, searching, capturing,
 * and cancelling payments.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post API reference}
 */
export class Payment {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new payment in MercadoPago.
	 *
	 * Sends a POST request to `/v1/payments` to create a payment with
	 * the specified payment method, amount, and payer information.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/payment/create.spec.ts Usage Example}.
	 */
	create({ body, requestOptions }: PaymentCreateData): Promise<PaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve a single payment by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/payment/get.spec.ts Usage Example}.
	 */
	get({ id, requestOptions }: PaymentGetData): Promise<PaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
	 * Search for payments using optional filters and pagination.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/payment/search.spec.ts Usage Example}.
	 */
	search(paymentSearchOptions: PaymentSearchData = {}): Promise<PaymentSearchResponse> {
		const { options, requestOptions } = paymentSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

	/**
	 * Capture a previously authorized payment.
	 *
	 * Used in two-step payment flows where the payment is first authorized
	 * and then captured separately. Can optionally capture a partial amount.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/payment/capture.spec.ts Usage Example}.
	 */
	capture({ id, transaction_amount, requestOptions }: PaymentCaptureData): Promise<PaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, transaction_amount, config: this.config });
	}

	/**
	 * Cancel a pending payment by setting its status to cancelled.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/payment/cancel.spec.ts Usage Example}.
	 */
	cancel({ id, requestOptions }: PaymentCancelData): Promise<PaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancel({ id, config: this.config });
	}
}