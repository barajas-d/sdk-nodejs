/**
 * Main MercadoPago SDK entry point.
 *
 * Provides a unified interface to all API clients, instantiating each one
 * with shared configuration (access token, HTTP options, etc.) and exposing
 * them as public properties.
 *
 * @module mercadopago
 */

import { MercadoPagoConfig } from './mercadoPagoConfig';

// Import all client classes
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
export interface MercadoPagoOptions {
	/** OAuth access token for authenticating API requests. */
	accessToken: string;
	/** Optional HTTP configuration (timeouts, headers, etc.). */
	options?: Options;
}

/**
 * Main SDK class providing access to all MercadoPago API clients.
 *
 * Instantiate this class with your access token and use the public
 * client properties to interact with different API resources.
 *
 * @example
 * ```typescript
 * import MercadoPago from 'mercadopago';
 *
 * const client = new MercadoPago({
 *   accessToken: 'YOUR_ACCESS_TOKEN',
 *   options: { timeout: 5000 }
 * });
 *
 * // Create a payment
 * const payment = await client.payment.create({
 *   body: {
 *     transaction_amount: 100,
 *     payment_method_id: 'pix',
 *     payer: { email: 'test@example.com' }
 *   }
 * });
 *
 * // Refund the payment
 * const refund = await client.refund.create({
 *   payment_id: payment.id
 * });
 * ```
 */
export default class MercadoPago extends MercadoPagoConfig {
	/** Client for advanced (marketplace split) payments. */
	public advancedPayment: AdvancedPayment;

	/** Client for tokenizing payment cards. */
	public cardToken: CardToken;

	/** Client for chargeback disputes. */
	public chargeback: Chargeback;

	/** Client for managing customers and their saved cards. */
	public customer: Customer;

	/** Client for managing saved payment cards. */
	public customerCard: CustomerCard;

	/** Client for retrieving available identification document types. */
	public identificationType: IdentificationType;

	/** Client for merchant orders (marketplace integrations). */
	public merchantOrder: MerchantOrder;

	/** Client for the new Orders API. */
	public order: Order;

	/** Client for payment operations (create, capture, cancel, etc.). */
	public payment: Payment;

	/** Client for retrieving available payment methods. */
	public paymentMethod: PaymentMethod;

	/** Client for payment refunds (legacy endpoint). */
	public paymentRefund: PaymentRefund;

	/** Client for subscription pre-approvals. */
	public preApproval: PreApproval;

	/** Client for subscription plans. */
	public preApprovalPlan: PreApprovalPlan;

	/** Client for payment preferences (Checkout Pro). */
	public preference: Preference;

	/** Client for order refunds (new refund endpoint). */
	public refund: Refund;

	/** Client for user account information. */
	public user: User;

	/**
	 * Construct a new MercadoPago SDK instance.
	 *
	 * @param config - Configuration object with access token and optional HTTP settings.
	 */
	constructor(config: MercadoPagoOptions) {
		super(config);

		// Instantiate all API clients with the shared configuration
		this.advancedPayment = new AdvancedPayment(this);
		this.cardToken = new CardToken(this);
		this.chargeback = new Chargeback(this);
		this.customer = new Customer(this);
		this.customerCard = new CustomerCard(this);
		this.identificationType = new IdentificationType(this);
		this.merchantOrder = new MerchantOrder(this);
		this.order = new Order(this);
		this.payment = new Payment(this);
		this.paymentMethod = new PaymentMethod(this);
		this.paymentRefund = new PaymentRefund(this);
		this.preApproval = new PreApproval(this);
		this.preApprovalPlan = new PreApprovalPlan(this);
		this.preference = new Preference(this);
		this.refund = new Refund(this);
		this.user = new User(this);
	}
}

// Re-export all client classes for direct import
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