import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Required JSON payload for a terminal print action. */
export type TerminalsCreateTerminalActionRequest = {
	type: 'PRINT_INFO' | 'PRINT_DTE';
	external_reference: string;
	config: {
		device_id: string;
	};
	content: {
		source?: string;
		dte_data?: string;
	};
};

/** Result of creating a terminal print action. */
export type TerminalsCreateTerminalActionResponse = {
	id?: string;
	status?: 'pending' | 'sent' | 'printed' | 'failed';
};

export type TerminalsCreateTerminalActionClient = {
	body: TerminalsCreateTerminalActionRequest;
	config: MercadoPagoConfig;
};

export type TerminalsCreateTerminalActionData = {
	body: TerminalsCreateTerminalActionRequest;
	requestOptions?: Options;
};