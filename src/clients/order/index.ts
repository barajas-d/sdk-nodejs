/**
 * Order API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing orders through the MercadoPago
 * Orders API. Orders represent a complete payment flow that can include
 * multiple transactions, payments, and refunds.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference MercadoPago Orders API reference}
 * @module clients/order
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import MPBase from '@src/MPBase';

/**
 * Client for the MercadoPago Orders API.
 *
 * Exposes operations for creating, retrieving, updating, and processing
 * orders as well as managing transactions and refunds within an order.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference API reference}
 */
export class Order extends MPBase {
	/**
	 * Creates a new Order client instance.
	 *
	 * @param mercadoPagoConfig - SDK configuration with access token and options
	 */
	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		super(mercadoPagoConfig);
	}
}