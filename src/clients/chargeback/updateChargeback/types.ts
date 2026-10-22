import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Documentation file supplied when updating a chargeback. */
export declare type ChargebackUpdateChargebackFile = {
	description?: string;
	name?: string;
	url?: string;
};

/** JSON payload for the chargeback documentation update. */
export declare type ChargebackUpdateChargebackBody = {
	files?: ChargebackUpdateChargebackFile[];
};

/** A successful update has no documented response body. */
export declare type ChargebackUpdateChargebackResponse = ApiResponse;

export declare type ChargebackUpdateChargebackClient = {
	id: string;
	body: ChargebackUpdateChargebackBody;
	config: MercadoPagoConfig;
};

export declare type ChargebackUpdateChargebackData = {
	id: string;
	body: ChargebackUpdateChargebackBody;
	requestOptions?: Options;
};