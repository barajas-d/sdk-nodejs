import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

/** JSON body used to configure QR integration callbacks. */
export type QRIntegratorConfigRequest = {
	callback_url?: string;
	/** @deprecated Use callback_url instead. */
	notification_url?: string;
};

/** PATCH /instore/integrator does not declare a JSON response body. */
export type QRIntegratorCreateQrIntegratorConfigResponse = ApiResponse;

export type QRIntegratorCreateQrIntegratorConfigClient = {
	body: QRIntegratorConfigRequest;
	config: MercadoPagoConfig;
};

export type QRIntegratorCreateQrIntegratorConfigData = {
	body: QRIntegratorConfigRequest;
	requestOptions?: Options;
};