import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** ISO 4217 currency codes accepted by the payouts API. */
export type CurrencyId = 'ARS' | 'BRL' | 'MXN' | 'CLP' | 'COP' | 'PEN' | 'UYU' | 'BOB' | 'PYG' | 'USD' | 'CRC' | 'DOP' | 'HNL' | 'NIO' | 'GTQ' | 'VES';

/** A transaction in the payout batch. */
export type PayoutTransaction = {
	amount?: number;
	beneficiary?: Record<string, unknown>;
	currency_id?: CurrencyId;
	payment_method_id?: string;
};

export type PayoutCreateRequest = {
	external_reference?: string;
	transactions?: PayoutTransaction[];
};

export type PayoutCreateClient = {
	body: PayoutCreateRequest;
	config: MercadoPagoConfig;
};

export type PayoutCreateData = {
	body: PayoutCreateRequest;
	requestOptions?: Options;
};