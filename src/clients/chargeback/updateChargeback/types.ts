import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Documentation file submitted for a chargeback. */
export type ChargebackUpdateChargebackFile = {
	name?: string;
	description?: string;
	url?: string;
};

/** JSON body required when updating chargeback documentation. */
export type ChargebackUpdateChargebackBody = {
	files: ChargebackUpdateChargebackFile[];
};

/** Data accepted by the Chargeback facade, including per-request HTTP options. */
export type ChargebackUpdateChargebackData = {
	id: string;
	body: ChargebackUpdateChargebackBody;
	requestOptions?: Options;
};

/** Data forwarded to the HTTP operation. */
export type ChargebackUpdateChargebackClient = ChargebackUpdateChargebackData & {
	config: MercadoPagoConfig;
};

/** The API does not specify a response-body schema for this operation. */
export type ChargebackUpdateChargebackResponse = Record<string, unknown>;
