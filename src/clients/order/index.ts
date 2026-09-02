/**
 * Order API client for the MercadoPago Node.js SDK.
 *
 * Provides operations for creating, retrieving, updating, and managing
 * orders through the `/v1/orders` resource. Supports transactions,
 * refunds, cancellations, captures, and processing.
 *
 * @module clients/order
 */

import create from './create';
import get from './get';
import cancel from './cancel';
import capture from './capture';
import process from './process';
import refund from './refund';
import createTransaction from './transaction/create';
import updateTransaction from './transaction/update';
import deleteTransaction from './transaction/delete';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { OrderCreateData } from './create/types';
import type { OrderGetData } from './get/types';
import type { OrderCancelData } from './cancel/types';
import type { OrderCaptureData } from './capture/types';
import type { OrderProcessData } from './process/types';
import type { OrderRefundData } from './refund/types';
import type { OrderTransactionCreateData } from './transaction/create/types';
import type { OrderTransactionUpdateData } from './transaction/update/types';
import type { OrderTransactionDeleteData } from './transaction/delete/types';
import type { OrderResponse } from './commonTypes';
import type { OrderTransactionResponse } from './transaction/commonTypes';
import type { ApiResponse } from '@src/types';

/**
 * Client for the MercadoPago Orders API.
 *
 * Provides comprehensive order management including creation, retrieval,
 * cancellation, capture, processing, refunds, and transaction operations.
 */
export class Order {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new order with one or more payment transactions.
	 *
	 * @see {@link https://www.mercadopago.com/developers/en/reference/orders/post Orders API reference}
	 */
	create({ body, requestOptions }: OrderCreateData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve an order by its unique identifier.
	 */
	get({ id, requestOptions }: OrderGetData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
	 * Cancel a pending order, preventing further processing.
	 */
	cancel({ id, requestOptions }: OrderCancelData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancel({ id, config: this.config });
	}

	/**
	 * Capture a previously authorized order to finalize payment.
	 */
	capture({ id, requestOptions }: OrderCaptureData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, config: this.config });
	}

	/**
	 * Process an order in manual processing mode.
	 */
	process({ id, requestOptions }: OrderProcessData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return process({ id, config: this.config });
	}

	/**
	 * Refund an order fully or partially.
	 *
	 * When called without a body, performs a full refund of all transactions.
	 * When called with a body containing transactions array, performs a partial
	 * refund of the specified transaction IDs and amounts.
	 *
	 * @see {@link https://www.mercadopago.com/developers/en/reference/orders/_orders_id_refund/post Refund Order API reference}
	 */
	refund({ id, body, requestOptions }: OrderRefundData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return refund({ id, body, config: this.config });
	}

	/**
	 * Create a new transaction within an existing order.
	 */
	createTransaction({ id, body, requestOptions }: OrderTransactionCreateData): Promise<OrderTransactionResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createTransaction({ id, body, config: this.config });
	}

	/**
	 * Update an existing transaction within an order.
	 */
	updateTransaction({ id, transactionId, body, requestOptions }: OrderTransactionUpdateData): Promise<OrderTransactionResponse['payments'][0]> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return updateTransaction({ id, transactionId, body, config: this.config });
	}

	/**
	 * Delete a transaction from an order.
	 */
	deleteTransaction({ id, transactionId, requestOptions }: OrderTransactionDeleteData): Promise<ApiResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return deleteTransaction({ id, transactionId, config: this.config });
	}
}