/**
 * Main entry point for the MercadoPago Node.js SDK.
 *
 * Exports the primary {@link MercadoPago} class that provides access to all
 * API client facades (Payment, Preference, Customer, Order, etc.) as well as
 * individual client classes for direct instantiation.
 *
 * @module mercadopago
 */

import { MercadoPagoConfig } from './mercadoPagoConfig';
import { Payment } from './clients/payment';
import { Preference } from './clients/preference';
import { Customer } from './clients/customer';
import { CustomerCard } from './clients/customerCard';
import { MerchantOrder } from './clients/merchantOrder';
import { Refund } from './clients/paymentRefund';
import { PreApproval } from './clients/preApproval';
import { PreApprovalPlan } from './clients/preApprovalPlan';
import { CardToken } from './clients/cardToken';
import { PaymentMethod } from './clients/paymentMethod';
import { IdentificationType } from './clients/identificationType';
import { User } from './clients/user';
import { AdvancedPayment } from './clients/advancedPayment';
import { Chargeback } from './clients/chargeback';
import { Order } from './clients/order';

/**
 * Main facade for the MercadoPago SDK.
 *
 * Instantiate this class with your access token and optional HTTP
 * configuration, then access individual API clients as properties
 * (e.g. `mercadopago.payment.create(...)`).
 *
 * @example
 * ```typescript
 * import MercadoPago from '@src/index';
 *
 * const client = new MercadoPago({
 *   accessToken: 'your_access_token',
 *   options: { timeout: 5000 }
 * });
 *
 * const payment = await client.payment.create({ body: { ... } });
 * const order = await client.order.create({ body: { ... } });
 * ```
 */
export default class MercadoPago extends MercadoPagoConfig {
	/** Client for payment operations (create, get, search, capture, cancel). */
	payment: Payment;

	/** Client for checkout preference operations (create, get, update, search). */
	preference: Preference;

	/** Client for customer management operations (create, get, update, remove, search). */
	customer: Customer;

	/** Client for saved customer card operations (create, get, update, remove, list). */
	customerCard: CustomerCard;

	/** Client for merchant order operations (create, get, update, search). */
	merchantOrder: MerchantOrder;

	/** Client for payment refund operations (create, get, list, total). */
	refund: Refund;

	/** Client for subscription (pre-approval) operations (create, get, update, search). */
	preApproval: PreApproval;

	/** Client for subscription plan operations (create, get, update, search). */
	preApprovalPlan: PreApprovalPlan;

	/** Client for card tokenization operations (create). */
	cardToken: CardToken;

	/** Client for payment method listing operations (get). */
	paymentMethod: PaymentMethod;

	/** Client for identification type listing operations (list). */
	identificationType: IdentificationType;

	/** Client for user information retrieval (get). */
	user: User;

	/** Client for advanced (split) payment operations (create, get, update, search, cancel, capture). */
	advancedPayment: AdvancedPayment;

	/** Client for chargeback dispute operations (get, search). */
	chargeback: Chargeback;

	/** Client for order operations (create, get, process, capture, cancel, refund). */
	order: Order;

	/**
	 * Initialize the MercadoPago SDK with your credentials.
	 *
	 * @param config - Configuration object containing access token and optional HTTP settings.
	 */
	constructor(config: MercadoPagoConfig) {
		super(config);
		this.payment = new Payment(config);
		this.preference = new Preference(config);
		this.customer = new Customer(config);
		this.customerCard = new CustomerCard(config);
		this.merchantOrder = new MerchantOrder(config);
		this.refund = new Refund(config);
		this.preApproval = new PreApproval(config);
		this.preApprovalPlan = new PreApprovalPlan(config);
		this.cardToken = new CardToken(config);
		this.paymentMethod = new PaymentMethod(config);
		this.identificationType = new IdentificationType(config);
		this.user = new User(config);
		this.advancedPayment = new AdvancedPayment(config);
		this.chargeback = new Chargeback(config);
		this.order = new Order(config);
	}
}