/**
 * Order API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing orders and their transactions
 * through the `/v1/orders` resource. Orders support various payment types
 * including online, QR, and instore payments with advanced features like
 * 3DS authentication and transaction confirmation.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference MercadoPago Orders API reference}
 * @module clients/order
 */

import create from './create';
import get from './get';
import process from './process';
import cancel from './cancel';
import capture from './capture';
import refund from './refund';
import createTransaction from './transaction/create';
import updateTransaction from './transaction/update';
import deleteTransaction from './transaction/delete';
import confirm from './confirm';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { OrderResponse } from './commonTypes';
import type { OrderCreateData } from './create/types';
import type { OrderGetData } from './get/types';
import type { OrderProcessData } from './process/types';
import type { OrderCancelData } from './cancel/types';
import type { OrderCaptureData } from './capture/types';
import type { OrderRefundData } from './refund/types';
import type { OrderTransactionCreateData, OrderTransactionCreateResponse } from './transaction/create/types';
import type { OrderTransactionUpdateData, OrderTransactionUpdateResponse } from './transaction/update/types';
import type { OrderTransactionDeleteData } from './transaction/delete/types';
import type { OrderConfirmData } from './confirm/types';

/**
 * Client for the MercadoPago Orders API.
 *
 * Exposes operations for creating, retrieving, processing, and managing
 * orders along with their associated payment transactions.
 */
export class Order {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new order in MercadoPago.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/order/create.spec.ts Usage Example}.
	 */
	create({ body, requestOptions }: OrderCreateData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve a single order by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/order/get.spec.ts Usage Example}.
	 */
	get({ id, requestOptions }: OrderGetData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
	 * Process an order with manual processing mode.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/order/process.spec.ts Usage Example}.
	 */
	process({ id, requestOptions }: OrderProcessData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return process({ id, config: this.config });
	}

	/**
	 * Cancel an existing order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/order/cancel.spec.ts Usage Example}.
	 */
	cancel({ id, requestOptions }: OrderCancelData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancel({ id, config: this.config });
	}

	/**
	 * Capture a previously authorized order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/order/capture.spec.ts Usage Example}.
	 */
	capture({ id, requestOptions }: OrderCaptureData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, config: this.config });
	}

	/**
	 * Refund an order either partially or totally.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/order/refund.spec.ts Usage Example}.
	 */
	refund({ id, body, requestOptions }: OrderRefundData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return refund({ id, body, config: this.config });
	}

	/**
	 * Create a new transaction for an existing order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/order/transaction/create.spec.ts Usage Example}.
	 */
	createTransaction({ id, body, requestOptions }: OrderTransactionCreateData): Promise<OrderTransactionCreateResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createTransaction({ id, body, config: this.config });
	}

	/**
	 * Update an existing transaction within an order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/order/transaction/update.spec.ts Usage Example}.
	 */
	updateTransaction({ id, transactionId, body, requestOptions }: OrderTransactionUpdateData): Promise<OrderTransactionUpdateResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return updateTransaction({ id, transactionId, body, config: this.config });
	}

	/**
	 * Delete a transaction from an order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/e2e/order/transaction/delete.spec.ts Usage Example}.
	 */
	deleteTransaction({ id, transactionId, requestOptions }: OrderTransactionDeleteData): Promise<void> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return deleteTransaction({ id, transactionId, config: this.config });
	}

	/**
	 * Confirm transaction amounts in an order.
	 * 
	 * This endpoint is only supported for instore QR payment type and allows
	 * confirming the final transaction amounts after the order has been created.
	 *
	 * @param options - Confirmation options including order ID, optional headers, and request body
	 * @returns The updated order with confirmed transaction amounts
	 */
	confirm({ orderId, body, idempotencyKey, productId, requestOptions }: OrderConfirmData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return confirm({ orderId, body, idempotencyKey, productId, config: this.config });
	}
}