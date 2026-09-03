/**
 * Shared domain types for the Order API client.
 *
 * Defines the response structure returned by order operations.
 *
 * @module clients/order/commonTypes
 */

import { ApiResponse } from '@src/types';

/**
 * Response representing a single order.
 */
export declare interface OrderResponse extends ApiResponse {
	/** Unique order identifier assigned by MercadoPago. */
	id?: string;
	/** Order type (e.g. `instore`). */
	type?: string;
	/** Current status of the order. */
	status?: string;
	/** Additional detail about the order status. */
	status_detail?: string;
	/** Integrator-supplied external reference for this order. */
	external_reference?: string;
	/** Total amount of the order. */
	total_amount?: string;
	/** Timestamp when the order was created (ISO 8601). */
	date_created?: string;
	/** Timestamp of the last update to the order (ISO 8601). */
	date_last_updated?: string;
	/** Transactions associated with this order. */
	transactions?: {
		/** Payment transactions. */
		payments?: Array<{
			/** Unique payment identifier. */
			id?: string;
			/** Payment amount. */
			amount?: string;
			/** Payment status. */
			status?: string;
			/** Payment status detail. */
			status_detail?: string;
		}>;
	};
}