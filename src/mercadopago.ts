/**
 * Main entry point for the MercadoPago Node.js SDK.
 *
 * This file exports the primary MercadoPago class and all available API
 * clients so consumers can access them via named imports or directly from
 * the main class instance.
 *
 * @module mercadopago
 */

import { MercadoPagoConfig } from './mercadoPagoConfig';
import { AdvancedPayment } from './clients/advancedPayment';
import { CardToken } from './clients/cardToken';
import { Chargeback } from './clients/chargeback';
import { Customer } from './clients/customer';
import { CustomerCard } from './clients/customerCard';
import { IdentificationType } from './clients/identificationType';
import { MerchantOrder } from './clients/merchantOrder';
import { Order } from './clients/order';
import { Payment } from './clients/payment';
import { PaymentMethod } from './clients/paymentMethod';
import { PaymentRefund } from './clients/paymentRefund';
import { PreApproval } from './clients/preApproval';
import { PreApprovalPlan } from './clients/preApprovalPlan';
import { Preference } from './clients/preference';
import { Refund } from './clients/refund';
import { User } from './clients/user';

import type { Options } from './types';

/**
 * Configuration options for initializing the MercadoPago SDK.
 */
export declare type MercadoPagoOptions = {
	/** OAuth access token for authenticating API requests. */
	accessToken: string;
	/** Optional HTTP client configuration (timeouts, retries, etc.). */
	options?: Options;
};

/**
 * Main facade for the MercadoPago SDK.
 *
 * Provides access to all API clients through properties and exposes the
 * raw access token for advanced use cases (e.g., custom HTTP requests).
 *
 * @example
 * ```typescript
 * import MercadoPago from 'mercadopago';
 *
 * const client = new MercadoPago({ accessToken: 'YOUR_ACCESS_TOKEN' });
 *
 * // Create a payment preference
 * const preference = await client.preference.create({
 *   body: {
 *     items: [{
 *       id: '1',
 *       title: 'Product',
 *       quantity: 1,
 *       unit_price: 100
 *     }]
 *   }
 * });
 * ```
 */
export default class MercadoPago {
	/** OAuth access token used for all API requests. */
	public accessToken: string;
	/** HTTP client configuration options. */
	public options?: Options;

	/** Client for advanced (split) payments across multiple sellers. */
	public advancedPayment: AdvancedPayment;
	/** Client for tokenizing credit/debit cards. */
	public cardToken: CardToken;
	/** Client for chargeback dispute management. */
	public chargeback: Chargeback;
	/** Client for managing customers and their saved cards. */
	public customer: Customer;
	/** Client for managing saved payment cards (used internally by Customer). */
	public customerCard: CustomerCard;
	/** Client for fetching identification document types by country. */
	public identificationType: IdentificationType;
	/** Client for managing merchant orders. */
	public merchantOrder: MerchantOrder;
	/** Client for creating and managing orders (newer alternative to Payment). */
	public order: Order;
	/** Client for creating and managing payments. */
	public payment: Payment;
	/** Client for fetching available payment methods. */
	public paymentMethod: PaymentMethod;
	/** Client for refunding payments (legacy, use Refund for newer flows). */
	public paymentRefund: PaymentRefund;
	/** Client for subscription pre-approvals. */
	public preApproval: PreApproval;
	/** Client for subscription plan templates. */
	public preApprovalPlan: PreApprovalPlan;
	/** Client for payment preferences (checkout configuration). */
	public preference: Preference;
	/** Client for refunding orders and payments (newer unified refund API). */
	public refund: Refund;
	/** Client for fetching authenticated user information. */
	public user: User;

	/**
	 * Initialize a new MercadoPago SDK instance.
	 *
	 * @param config - Access token and optional HTTP configuration.
	 */
	constructor({ accessToken, options }: MercadoPagoOptions) {
		this.accessToken = accessToken;
		this.options = options;

		const mercadoPagoConfig = new MercadoPagoConfig({ accessToken, options });

		this.advancedPayment = new AdvancedPayment(mercadoPagoConfig);
		this.cardToken = new CardToken(mercadoPagoConfig);
		this.chargeback = new Chargeback(mercadoPagoConfig);
		this.customer = new Customer(mercadoPagoConfig);
		this.customerCard = new CustomerCard(mercadoPagoConfig);
		this.identificationType = new IdentificationType(mercadoPagoConfig);
		this.merchantOrder = new MerchantOrder(mercadoPagoConfig);
		this.order = new Order(mercadoPagoConfig);
		this.payment = new Payment(mercadoPagoConfig);
		this.paymentMethod = new PaymentMethod(mercadoPagoConfig);
		this.paymentRefund = new PaymentRefund(mercadoPagoConfig);
		this.preApproval = new PreApproval(mercadoPagoConfig);
		this.preApprovalPlan = new PreApprovalPlan(mercadoPagoConfig);
		this.preference = new Preference(mercadoPagoConfig);
		this.refund = new Refund(mercadoPagoConfig);
		this.user = new User(mercadoPagoConfig);
	}
}

// Named exports for all API clients
export {
	AdvancedPayment,
	CardToken,
	Chargeback,
	Customer,
	CustomerCard,
	IdentificationType,
	MerchantOrder,
	Order,
	Payment,
	PaymentMethod,
	PaymentRefund,
	PreApproval,
	PreApprovalPlan,
	Preference,
	Refund,
	User,
};