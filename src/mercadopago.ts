/**
 * Main entry point for the MercadoPago Node.js SDK.
 *
 * This module provides the primary {@link MercadoPago} class that serves as
 * the SDK configuration container and factory for all API resource clients.
 *
 * @module mercadopago
 */

import { MercadoPagoConfig } from './mercadoPagoConfig';
import { Payment } from './clients/payment';
import { PaymentMethod } from './clients/paymentMethod';
import { PaymentRefund } from './clients/paymentRefund';
import { MerchantOrder } from './clients/merchantOrder';
import { PreApproval } from './clients/preApproval';
import { PreApprovalPlan } from './clients/preApprovalPlan';
import { Preference } from './clients/preference';
import { Customer } from './clients/customer';
import { CustomerCard } from './clients/customerCard';
import { CardToken } from './clients/cardToken';
import { IdentificationType } from './clients/identificationType';
import { User } from './clients/user';
import { Order } from './clients/order';
import { Refund } from './clients/refund';
import { AdvancedPayment } from './clients/advancedPayment';
import { Chargeback } from './clients/chargeback';

import type { Options } from './types';

/**
 * Configuration options for initializing the MercadoPago SDK.
 */
export interface MercadoPagoOptions {
	/** OAuth access token for authenticating with the MercadoPago API. */
	accessToken: string;
	/** Optional HTTP client configuration (timeouts, retries, etc.). */
	options?: Options;
}

/**
 * Main MercadoPago SDK client.
 *
 * Instantiate this class with your credentials to access all API resource
 * clients. Each resource (Payment, Customer, etc.) is exposed as a public
 * property initialized with the shared configuration.
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
 * // Refund an order
 * const refund = await client.refund.create({
 *   id: 'ORDER_ID',
 *   body: {
 *     transactions: [
 *       { id: 'TRANSACTION_ID', amount: '50.00' }
 *     ]
 *   }
 * });
 * ```
 */
export default class MercadoPago extends MercadoPagoConfig {
	/** Access token used for API authentication. */
	public accessToken: string;
	/** Payment operations client. */
	public payment: Payment;
	/** Payment method listing client. */
	public paymentMethod: PaymentMethod;
	/** Payment refund operations client. */
	public paymentRefund: PaymentRefund;
	/** Merchant order operations client. */
	public merchantOrder: MerchantOrder;
	/** Subscription (pre-approval) operations client. */
	public preApproval: PreApproval;
	/** Subscription plan operations client. */
	public preApprovalPlan: PreApprovalPlan;
	/** Checkout preference operations client. */
	public preference: Preference;
	/** Customer management client. */
	public customer: Customer;
	/** Customer saved-card operations client. */
	public customerCard: CustomerCard;
	/** Card tokenization client. */
	public cardToken: CardToken;
	/** Identification type listing client. */
	public identificationType: IdentificationType;
	/** User information client. */
	public user: User;
	/** Order operations client (including 3DS support). */
	public order: Order;
	/** Refund operations client for orders. */
	public refund: Refund;
	/** Advanced (split) payment operations client. */
	public advancedPayment: AdvancedPayment;
	/** Chargeback dispute operations client. */
	public chargeback: Chargeback;

	/**
	 * Initialize the MercadoPago SDK with your credentials.
	 *
	 * @param config - Configuration object containing access token and options.
	 */
	constructor(config: MercadoPagoOptions) {
		super(config);
		this.accessToken = config.accessToken;

		// Initialize all resource clients with the shared configuration
		this.payment = new Payment(this);
		this.paymentMethod = new PaymentMethod(this);
		this.paymentRefund = new PaymentRefund(this);
		this.merchantOrder = new MerchantOrder(this);
		this.preApproval = new PreApproval(this);
		this.preApprovalPlan = new PreApprovalPlan(this);
		this.preference = new Preference(this);
		this.customer = new Customer(this);
		this.customerCard = new CustomerCard(this);
		this.cardToken = new CardToken(this);
		this.identificationType = new IdentificationType(this);
		this.user = new User(this);
		this.order = new Order(this);
		this.refund = new Refund(this);
		this.advancedPayment = new AdvancedPayment(this);
		this.chargeback = new Chargeback(this);
	}
}

// Re-export all resource clients for direct import
export {
	Payment,
	PaymentMethod,
	PaymentRefund,
	MerchantOrder,
	PreApproval,
	PreApprovalPlan,
	Preference,
	Customer,
	CustomerCard,
	CardToken,
	IdentificationType,
	User,
	Order,
	Refund,
	AdvancedPayment,
	Chargeback,
};