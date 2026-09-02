/**
 * Order API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing orders through the `/v1/orders`
 * resource, including creation, retrieval, processing, capturing, canceling,
 * refunding, and confirming orders.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/orders MercadoPago Orders API reference}
 * @module clients/order
 */

import create from './create';
import get from './get';
import process from './process';
import capture from './capture';
import cancel from './cancel';
import refund from './refund';
import confirm from './confirm';
import createTransaction from './createTransaction';
import updateTransaction from './updateTransaction';
import deleteTransaction from './deleteTransaction';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { OrderResponse } from './commonTypes';
import type { OrderCreateData } from './create/types';
import type { OrderGetData } from './get/types';
import type { OrderProcessData } from './process/types';
import type { OrderCaptureData } from './capture/types';
import type { OrderCancelData } from './cancel/types';
import type { OrderRefundData } from './refund/types';
import type { OrderConfirmData } from './confirm/types';
import type { OrderCreateTransactionData, OrderCreateTransactionResponse } from './createTransaction/types';
import type { OrderUpdateTransactionData, OrderUpdateTransactionResponse } from './updateTransaction/types';
import type { OrderDeleteTransactionData } from './deleteTransaction/types';

/**
 * Client for the MercadoPago Orders API.
 *
 * Exposes operations for managing orders and their associated transactions,
 * including payment processing, capturing, canceling, and refunding.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/online-payments/orders API reference}
 */
export class Order {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new order in MercadoPago.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/create.ts Usage Example}.
	 */
	create({ body, requestOptions }: OrderCreateData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve a single order by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/get.ts Usage Example}.
	 */
	get({ id, requestOptions }: OrderGetData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
	 * Process an order with manual processing mode.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/process.ts Usage Example}.
	 */
	process({ id, requestOptions }: OrderProcessData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return process({ id, config: this.config });
	}

	/**
	 * Capture a previously authorized order payment.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/capture.ts Usage Example}.
	 */
	capture({ id, requestOptions }: OrderCaptureData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, config: this.config });
	}

	/**
	 * Cancel a pending order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/cancel.ts Usage Example}.
	 */
	cancel({ id, requestOptions }: OrderCancelData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancel({ id, config: this.config });
	}

	/**
	 * Refund an order partially or totally.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/refund.ts Usage Example}.
	 */
	refund({ id, body, requestOptions }: OrderRefundData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return refund({ id, body, config: this.config });
	}

	/**
	 * Confirm transaction amounts in an order.
	 * This endpoint is only supported for instore QR payment type.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/confirm.ts Usage Example}.
	 */
	confirm({ orderId, body, idempotencyKey, productId, requestOptions }: OrderConfirmData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return confirm({ orderId, body, idempotencyKey, productId, config: this.config });
	}

	/**
	 * Create a new transaction for an order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/createTransaction.ts Usage Example}.
	 */
	createTransaction({ id, body, requestOptions }: OrderCreateTransactionData): Promise<OrderCreateTransactionResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createTransaction({ id, body, config: this.config });
	}

	/**
	 * Update an existing transaction in an order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/updateTransaction.ts Usage Example}.
	 */
	updateTransaction({ id, transactionId, body, requestOptions }: OrderUpdateTransactionData): Promise<OrderUpdateTransactionResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return updateTransaction({ id, transactionId, body, config: this.config });
	}

	/**
	 * Delete a transaction from an order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/deleteTransaction.ts Usage Example}.
	 */
	deleteTransaction({ id, transactionId, requestOptions }: OrderDeleteTransactionData): Promise<{ api_response: { status: number } }> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return deleteTransaction({ id, transactionId, config: this.config });
	}
}