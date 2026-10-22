import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Query parameters for available installment plans. */
export type PaymentMethodGetInstallmentsData = {
	payment_method_id: string;
	amount: number;
	issuer_id?: string;
	bin?: string;
	requestOptions?: Options;
};

/** Internal parameters passed to the installment lookup. */
export type PaymentMethodGetInstallmentsClient = PaymentMethodGetInstallmentsData & {
	config: MercadoPagoConfig;
};

/** Issuer offering an installment plan. */
export type PaymentMethodInstallmentIssuer = {
	id?: number;
	name?: string;
};

/** Cost breakdown for one installment count. */
export type PaymentMethodInstallmentPayerCost = {
	discount_rate?: number;
	installment_amount?: number;
	installment_rate?: number;
	installments?: number;
	labels?: string[];
	reimbursement_rate?: number;
	total_amount?: number;
};

/** Available installment options for a payment method. */
export type PaymentMethodGetInstallmentsResponse = {
	issuer?: PaymentMethodInstallmentIssuer;
	payer_costs?: PaymentMethodInstallmentPayerCost[];
	payment_method_id?: string;
	payment_type_id?: string;
};