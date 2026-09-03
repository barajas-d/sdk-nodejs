/**
 * Order API client for the MercadoPago Node.js SDK.
 *
 * Provides methods for managing orders, including confirming transaction
 * amounts for instore QR payment types.
 *
 * @module clients/order
 */

import confirm from './confirm';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { OrderConfirmData } from './confirm/types';
import type { OrderResponse } from './commonTypes';

/**
 * Client for the MercadoPago Order API.
 *
 * Exposes operations for managing orders, particularly for instore QR
 * payment flows where transaction amounts need to be confirmed.
 */
export class Order {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Confirm transaction amounts in an order for instore QR payment type.
	 *
	 * Sends a POST request to `/v1/orders/{order_id}/confirm` to validate
	 * and confirm the payment amounts in an instore QR order.
	 */
	confirm({ orderId, requestOptions }: OrderConfirmData): Promise<OrderResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return confirm({ orderId, config: this.config });
	}
}