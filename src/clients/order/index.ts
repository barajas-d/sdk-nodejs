/**
 * Order API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing orders through the `/v1/orders`
 * resource. Supports creating, retrieving, updating, processing, capturing,
 * cancelling, and refunding orders, as well as managing order transactions
 * and simulating order events.
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
import createTransaction from './transaction/create';
import updateTransaction from './transaction/update';
import deleteTransaction from './transaction/delete';
import simulateEvent from './simulateEvent';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { OrderCreateData } from './create/types';
import type { OrderGetData } from './get/types';
import type { OrderProcessData } from './process/types';
import type { OrderCaptureData } from './capture/types';
import type { OrderCancelData } from './cancel/types';
import type { OrderRefundData } from './refund/types';
import type { OrderResponse } from './commonTypes';
import type { OrderTransactionCreateData } from './transaction/create/types';
import type { OrderTransactionUpdateData } from './transaction/update/types';
import type { OrderTransactionDeleteData } from './transaction/delete/types';
import type { OrderTransactionResponse } from './transaction/commonTypes';
import type { OrderSimulateEventData } from './simulateEvent/types';

/**
 * Client for the MercadoPago Orders API.
 *
 * Exposes operations for creating and managing orders, including order
 * transactions and event simulation for testing purposes.
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
	 * Process an order (manual processing mode).
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/process.ts Usage Example}.
	 */
	process({ id, requestOptions }: OrderProcessData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return process({ id, config: this.config });
	}

	/**
	 * Capture a previously authorized order.
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
	 * Create a new transaction for an order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/transaction/create.ts Usage Example}.
	 */
	createTransaction({ id, body, requestOptions }: OrderTransactionCreateData): Promise<OrderTransactionResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createTransaction({ id, body, config: this.config });
	}

	/**
	 * Update an existing transaction on an order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/transaction/update.ts Usage Example}.
	 */
	updateTransaction({ id, transactionId, body, requestOptions }: OrderTransactionUpdateData): Promise<OrderTransactionResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return updateTransaction({ id, transactionId, body, config: this.config });
	}

	/**
	 * Delete a transaction from an order.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/transaction/delete.ts Usage Example}.
	 */
	deleteTransaction({ id, transactionId, requestOptions }: OrderTransactionDeleteData): Promise<void> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return deleteTransaction({ id, transactionId, config: this.config });
	}

	/**
	 * Simulate an event on an order to change its status.
	 * This endpoint is only enabled for inStore point orders.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/order/simulateEvent.ts Usage Example}.
	 */
	simulateEvent({ orderId, body, requestOptions }: OrderSimulateEventData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return simulateEvent({ orderId, body, config: this.config });
	}
}