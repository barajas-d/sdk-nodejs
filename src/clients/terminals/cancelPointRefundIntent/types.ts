import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

export type TerminalsCancelPointRefundIntentClient = {
	deviceid: string;
	refundintentid: string;
	config: MercadoPagoConfig;
};

export type TerminalsCancelPointRefundIntentData = {
	deviceid: string;
	refundintentid: string;
	requestOptions?: Options;
};

export type CancelPointRefundIntentResponse = ApiResponse;