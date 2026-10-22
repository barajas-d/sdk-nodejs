import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type TerminalsGetTerminalActionClient = {
	action_id: string;
	config: MercadoPagoConfig;
};

export type TerminalsGetTerminalActionData = {
	action_id: string;
	requestOptions?: Options;
};

export type TerminalsGetTerminalActionResponse = {
	id?: string;
	status?: 'pending' | 'sent' | 'printed' | 'failed';
	type?: string;
	external_reference?: string;
	date_created?: string;
};