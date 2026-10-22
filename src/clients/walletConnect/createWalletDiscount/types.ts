import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

/** ISO 4217 currency for Wallet Connect discounts. */
export type CurrencyId = 'ARS' | 'BRL' | 'MXN' | 'CLP' | 'COP' | 'PEN' | 'UYU' | 'BOB' | 'PYG' | 'USD' | 'CRC' | 'DOP' | 'HNL' | 'NIO' | 'GTQ' | 'VES';

export type WalletDiscountCreateBody = {
	coupon: string;
	amount: number;
};

export type WalletDiscountCreateData = {
	payerToken: string;
	body: WalletDiscountCreateBody;
	requestOptions?: Options;
};

export type WalletDiscountCreateClient = WalletDiscountCreateData & {
	config: MercadoPagoConfig;
};

export interface WalletDiscountCreateResponse extends ApiResponse {
	currency_id?: CurrencyId;
	discount?: {
		amount?: number;
		coupon_id?: string;
		type?: string;
	};
	legal_terms?: string;
	transaction_amount?: number;
}