import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

export type WalletCouponValidateClient = {
	config: MercadoPagoConfig;
	payerToken: string;
	body: WalletCouponValidateRequest;
};

export type WalletCouponValidateData = {
	payerToken: string;
	body: WalletCouponValidateRequest;
	requestOptions?: Options;
};

export type WalletCouponValidateRequest = {
	id: string;
};

export interface WalletCouponValidateResponse extends ApiResponse {
	status?: 'active' | 'inactive' | 'expired';
	description?: string;
	detail?: Record<string, unknown>;
	legal_terms?: string;
}