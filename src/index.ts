/**
 * MercadoPago Node.js SDK — public API surface.
 *
 * Re-exports every client class and the SDK configuration object so
 * consumers can import everything from a single entry point:
 *
 * ```ts
 * import MercadoPagoConfig, { Payment, Order } from 'mercadopago';
 * ```
 *
 * @module mercadopago
 */

import { MercadoPagoConfig } from './mercadoPagoConfig';
export default MercadoPagoConfig;
export { MercadoPagoConfig };

/** Tokenization client — creates secure, single-use card tokens for PCI compliance. */
export { CardToken } from './clients/cardToken';
/** Customer-card client — manages saved payment cards linked to a customer. */
export { CustomerCard } from './clients/customerCard';
/** Customer-address client — lists and creates addresses linked to a customer. */
export { CustomerAddress } from './clients/customerAddress';
/** Customer client — CRUD operations on buyer profiles stored in MercadoPago. */
export { Customer } from './clients/customer';
/** Advanced-payment client — marketplace split-payment management. */
export { AdvancedPayment } from './clients/advancedPayment';
/** Chargeback client — retrieves and searches payment dispute records. */
export { Chargeback } from './clients/chargeback';
/** Disbursement-refund client — manages refunds for split-payment disbursements. */
export { DisbursementRefund } from './clients/disbursementRefund';
/** Invoice client — retrieves and searches subscription-generated invoices. */
export { Invoice } from './clients/invoice';
/** Identification-type client — lists accepted ID document types per country. */
export { IdentificationType } from './clients/identificationType';
/** Payment-refund client — creates, retrieves, and lists refunds on a payment. */
export { PaymentRefund } from './clients/paymentRefund';
/** Payment-method client — lists available payment methods for a given country/site. */
export { PaymentMethod } from './clients/paymentMethod';
/** Payment client — creates, retrieves, searches, captures, and cancels payments. */
export { Payment } from './clients/payment';
/** Pre-approval (subscription) client — manages recurring billing agreements. */
export { PreApproval } from './clients/preApproval';
/** Pre-approval plan client — manages subscription plan templates. */
export { PreApprovalPlan } from './clients/preApprovalPlan';
/** Point (Smart POS) client — manages in-person payment intents and devices. */
export { Point } from './clients/point';
/** Terminals client — manages refund intents on Point terminal devices. */
export { Terminals } from './clients/terminals';
/** Preference client — creates and manages Checkout Pro payment preferences. */
export { Preference } from './clients/preference';
/** OAuth client — handles authorization code exchange, token refresh, and auth URL generation. */
export { OAuth } from './clients/oAuth';
/** Merchant-order client — groups multiple payments under a single commercial order. */
export { MerchantOrder } from './clients/merchantOrder';
/** User client — retrieves the authenticated MercadoPago account profile. */
export { User } from './clients/user';
/** Order client — creates, processes, captures, cancels, and refunds orders (v2 API). */
export { Order } from './clients/order';
/** QR integrator client — retrieves and updates in-store QR configuration. */
export { QRIntegrator } from './clients/qrIntegrator';
/** QR orders client — confirms in-store QR cashout status. */
export { QROrders } from './clients/qrOrders';
/** Claims client — manages post-purchase claims and shipping evidence. */
export { Claims } from './clients/claims';
/** Stores client — retrieves store information by ID. */
export { Stores } from './clients/stores';
/** Releases-report client — manages report generation and configuration. */
export { ReleasesReport } from './clients/releasesReport';
/** Settlements-report client — manages report generation and configuration. */
export { SettlementsReport } from './clients/settlementsReport';
/** Payouts client — creates batches and manages payout transactions. */
export { Payouts } from './clients/payouts';
/** Wallet Connect client — manages wallet agreements and payer tokens. */
export { WalletConnect } from './clients/walletConnect';

export {
	WebhookSignatureValidator,
	InvalidWebhookSignatureError,
	SignatureFailureReason,
} from './utils/webhook';
export type { ValidateOptions } from './utils/webhook';
