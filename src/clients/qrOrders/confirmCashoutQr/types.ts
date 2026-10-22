import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

/** JSON payload used to confirm or cancel a QR cashout. */
export type ConfirmCashoutQrRequest = {
	status: 'confirmed' | 'cancelled';
};

/** The confirmation response has no declared body fields. */
export type ConfirmCashoutQrResponse = ApiResponse;

export type ConfirmCashoutQrClient = {
	merchantOrderId: string;
	body: ConfirmCashoutQrRequest;
	config: MercadoPagoConfig;
};

export type ConfirmCashoutQrData = {
	merchantOrderId: string;
	body: ConfirmCashoutQrRequest;
	requestOptions?: Options;
};