/**
 * Order API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing orders through the MercadoPago API.
 * Orders support online payment flows, transaction management, refunds, and event simulation.
 * This client serves as the foundation for all order-related operations including
 * confirm, simulate events, refund, and get refunds endpoints.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/orders MercadoPago Orders API reference}
 * @module clients/order
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/**
 * Client for the MercadoPago Orders API.
 *
 * This class provides methods to create, retrieve, update, process, capture,
 * cancel orders, as well as manage transactions and refunds. It serves as the
 * foundation for a comprehensive order management system within the SDK.
 */
export class Order {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	/**
	 * Initialize the Order client with MercadoPago configuration.
	 *
	 * @param mercadoPagoConfig - Configuration object containing access token and options
	 */
	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}
}