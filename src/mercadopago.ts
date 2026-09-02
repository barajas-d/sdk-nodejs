/**
 * Main entry point for the MercadoPago Node.js SDK.
 *
 * This module exports the primary {@link MercadoPago} class, which acts as
 * the facade for all API clients exposed by the SDK. Instantiate this class
 * with your credentials to gain access to payment, customer, preference,
 * order, and other MercadoPago API operations.
 *
 * @module mercadopago
 */

import { MercadoPagoConfig } from './mercadoPagoConfig';

import { Payment } from './clients/payment';
import { Preference } from './clients/preference';
import { Customer } from './clients/customer';
import { CustomerCard } from './clients/customerCard';
import { CardToken } from './clients/cardToken';
import { PaymentMethod } from './clients/paymentMethod';
import { IdentificationType } from './clients/identificationType';
import { MerchantOrder } from './clients/merchantOrder';
import { PreApproval } from './clients/preApproval';
import { PreApprovalPlan } from './clients/preApprovalPlan';
import { PaymentRefund } from './clients/paymentRefund';
import { User } from './clients/user';
import { AdvancedPayment } from './clients/advancedPayment';
import { Chargeback } from './clients/chargeback';
import { Order } from './clients/order';

import type { MercadoPagoConfigInterface } from './mercadoPagoConfig';

/**
 * Main facade class for the MercadoPago Node.js SDK.
 *
 * Provides access to all API clients through a single, unified interface.
 * Each client is lazily instantiated when first accessed, sharing the same
 * configuration (credentials and HTTP options) provided at construction time.
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
 * // Use any of the available API clients
 * const payment = await client.payment.create({ body: { ... } });
 * const customer = await client.customer.get({ customerId: '123' });
 * const order = await client.order.create({ body: { ... } });
 * ```
 */
export default class MercadoPago extends MercadoPagoConfig {
	/** Access token used for authenticating API requests. */
	public accessToken: string;

	/** Client for managing payment transactions. */
	public payment: Payment;

	/** Client for creating and managing checkout preferences. */
	public preference: Preference;

	/** Client for managing customers and their saved cards. */
	public customer: Customer;

	/** Client for managing saved payment cards associated with customers. */
	public customerCard: CustomerCard;

	/** Client for tokenizing card data for secure payment processing. */
	public cardToken: CardToken;

	/** Client for listing available payment methods. */
	public paymentMethod: PaymentMethod;

	/** Client for listing available identification document types. */
	public identificationType: IdentificationType;

	/** Client for managing merchant orders. */
	public merchantOrder: MerchantOrder;

	/** Client for managing subscription pre-approvals. */
	public preApproval: PreApproval;

	/** Client for managing subscription pre-approval plans. */
	public preApprovalPlan: PreApprovalPlan;

	/** Client for creating and managing payment refunds. */
	public paymentRefund: PaymentRefund;

	/** Client for retrieving user account information. */
	public user: User;

	/** Client for managing advanced (marketplace split) payments. */
	public advancedPayment: AdvancedPayment;

	/** Client for retrieving chargeback dispute information. */
	public chargeback: Chargeback;

	/** Client for managing orders (including 3DS transactions). */
	public order: Order;

	/**
	 * Constructs a new MercadoPago SDK client instance.
	 *
	 * @param config - Configuration object containing credentials and options.
	 * @param config.accessToken - OAuth2 access token for authenticating requests.
	 * @param config.options - Optional HTTP client configuration (timeout, etc.).
	 */
	constructor(config: MercadoPagoConfigInterface) {
		super(config);
		this.accessToken = config.accessToken;

		// Instantiate all API clients with the shared configuration
		this.payment = new Payment(this);
		this.preference = new Preference(this);
		this.customer = new Customer(this);
		this.customerCard = new CustomerCard(this);
		this.cardToken = new CardToken(this);
		this.paymentMethod = new PaymentMethod(this);
		this.identificationType = new IdentificationType(this);
		this.merchantOrder = new MerchantOrder(this);
		this.preApproval = new PreApproval(this);
		this.preApprovalPlan = new PreApprovalPlan(this);
		this.paymentRefund = new PaymentRefund(this);
		this.user = new User(this);
		this.advancedPayment = new AdvancedPayment(this);
		this.chargeback = new Chargeback(this);
		this.order = new Order(this);
	}
}

// Named exports for direct client imports
export { MercadoPago };
export { Payment } from './clients/payment';
export { Preference } from './clients/preference';
export { Customer } from './clients/customer';
export { CustomerCard } from './clients/customerCard';
export { CardToken } from './clients/cardToken';
export { PaymentMethod } from './clients/paymentMethod';
export { IdentificationType } from './clients/identificationType';
export { MerchantOrder } from './clients/merchantOrder';
export { PreApproval } from './clients/preApproval';
export { PreApprovalPlan } from './clients/preApprovalPlan';
export { PaymentRefund } from './clients/paymentRefund';
export { User } from './clients/user';
export { AdvancedPayment } from './clients/advancedPayment';
export { Chargeback } from './clients/chargeback';
export { Order } from './clients/order';