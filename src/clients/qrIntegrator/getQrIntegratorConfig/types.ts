import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

export type QRIntegratorGetQrIntegratorConfigClient = {
	config: MercadoPagoConfig;
};

export type QRIntegratorGetQrIntegratorConfigData = {
	requestOptions?: Options;
};

export interface QRIntegratorGetQrIntegratorConfigResponse extends ApiResponse {
	callback_url?: string;
}