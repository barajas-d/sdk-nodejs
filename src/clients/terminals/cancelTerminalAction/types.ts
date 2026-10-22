import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type TerminalsCancelTerminalActionClient = {
	action_id: string;
	config: MercadoPagoConfig;
};

export type TerminalsCancelTerminalActionData = {
	action_id: string;
	requestOptions?: Options;
};