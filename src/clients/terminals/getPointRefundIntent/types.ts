import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type TerminalsGetPointRefundIntentClient = {
	refundintentid: string;
	config: MercadoPagoConfig;
};

export type TerminalsGetPointRefundIntentData = {
	refundintentid: string;
	requestOptions?: Options;
};

export type GetPointRefundIntentResponse = {
	id?: string;
	payment_id?: number;
	amount?: number;
	status?: string;
};