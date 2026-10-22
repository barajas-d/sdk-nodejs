import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type TerminalsCreatePointRefundIntentRequest = {
	payment_id: number;
	amount?: number;
};

export type TerminalsCreatePointRefundIntentResponse = {
	id?: string;
	status?: string;
};

export type TerminalsCreatePointRefundIntentClient = {
	deviceid: string;
	body: TerminalsCreatePointRefundIntentRequest;
	config: MercadoPagoConfig;
};

export type TerminalsCreatePointRefundIntentData = {
	deviceid: string;
	body: TerminalsCreatePointRefundIntentRequest;
	requestOptions?: Options;
};