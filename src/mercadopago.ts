/**
 * Main entry point for the MercadoPago Node.js SDK.
 *
 * The {@link MercadoPago} class acts as a factory that instantiates and
 * exposes all domain-specific API clients (Payment, Preference, Customer,
 * Order, etc.) using a single shared configuration object containing the
 * access token and global HTTP options.
 *
 * @module mercadopago
 */

import { MercadoPagoConfig } from './mercadoPagoConfig';

import { Payment } from './clients/payment';
import { Preference } from './clients/preference';
import { PreApproval } from './clients/preApproval';
import { PreApprovalPlan } from './clients/preApprovalPlan';
import { Customer } from './clients/customer';
import { CustomerCard } from './clients/customerCard';
import { CardToken } from './clients/cardToken';
import { PaymentMethod } from './clients/paymentMethod';
import { MerchantOrder } from './clients/merchantOrder';
import { PaymentRefund } from './clients/paymentRefund';
import { IdentificationType } from './clients/identificationType';
import { User } from './clients/user';
import { AdvancedPayment } from './clients/advancedPayment';
import { Chargeback } from './clients/chargeback';
import { Order } from './clients/order';

/**
 * Configuration options for initializing the MercadoPago SDK.
 */
export interface MercadoPagoOptions {
	/** OAuth2 access token for authenticating API requests. */
	accessToken: string;
	/** Global HTTP options (timeout, idempotency key, etc.) applied to all requests. */
	options?: {
		timeout?: number;
		idempotencyKey?: string;
		[key: string]: any;
	};
}

/**
 * Main SDK client providing access to all MercadoPago API resources.
 *
 * Instantiate this class once with your credentials, then access the
 * individual resource clients (e.g. `payment`, `preference`, `order`)
 * as properties.
 *
 * @example
 * ```typescript
 * const client = new MercadoPago({ accessToken: 'YOUR_ACCESS_TOKEN' });
 * const payment = await client.payment.create({ body: { ... } });
 * const order = await client.order.create({ body: { ... } });
 * ```
 */
export default class MercadoPago extends MercadoPagoConfig {
	/** Client for managing payments. */
	public payment: Payment;
	/** Client for managing checkout preferences. */
	public preference: Preference;
	/** Client for managing subscriptions (pre-approvals). */
	public preApproval: PreApproval;
	/** Client for managing subscription plans. */
	public preApprovalPlan: PreApprovalPlan;
	/** Client for managing customers. */
	public customer: Customer;
	/** Client for managing saved customer cards. */
	public customerCard: CustomerCard;
	/** Client for tokenizing card data. */
	public cardToken: CardToken;
	/** Client for querying available payment methods. */
	public paymentMethod: PaymentMethod;
	/** Client for managing merchant orders. */
	public merchantOrder: MerchantOrder;
	/** Client for managing payment refunds. */
	public paymentRefund: PaymentRefund;
	/** Client for querying identification types. */
	public identificationType: IdentificationType;
	/** Client for retrieving user information. */
	public user: User;
	/** Client for managing advanced (split) payments. */
	public advancedPayment: AdvancedPayment;
	/** Client for managing chargeback disputes. */
	public chargeback: Chargeback;
	/** Client for managing orders (Orders API v2). */
	public order: Order;

	constructor({ accessToken, options }: MercadoPagoOptions) {
		super({ accessToken, options });

		this.payment = new Payment(this);
		this.preference = new Preference(this);
		this.preApproval = new PreApproval(this);
		this.preApprovalPlan = new PreApprovalPlan(this);
		this.customer = new Customer(this);
		this.customerCard = new CustomerCard(this);
		this.cardToken = new CardToken(this);
		this.paymentMethod = new PaymentMethod(this);
		this.merchantOrder = new MerchantOrder(this);
		this.paymentRefund = new PaymentRefund(this);
		this.identificationType = new IdentificationType(this);
		this.user = new User(this);
		this.advancedPayment = new AdvancedPayment(this);
		this.chargeback = new Chargeback(this);
		this.order = new Order(this);
	}
}

export {
	MercadoPagoConfig,
	Payment,
	Preference,
	PreApproval,
	PreApprovalPlan,
	Customer,
	CustomerCard,
	CardToken,
	PaymentMethod,
	MerchantOrder,
	PaymentRefund,
	IdentificationType,
	User,
	AdvancedPayment,
	Chargeback,
	Order
};