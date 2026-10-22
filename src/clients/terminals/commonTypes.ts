import type { ApiResponse } from '@src/types';

/** The state of a terminal print action. */
export type TerminalActionStatus = 'pending' | 'sent' | 'printed' | 'failed';

/** Result of sending a print action to a terminal. */
export interface CreateTerminalActionResponse extends ApiResponse {
	id?: string;
	status?: TerminalActionStatus;
}

/** Details and current status of an existing print action. */
export interface GetTerminalActionResponse extends ApiResponse {
	id?: string;
	status?: TerminalActionStatus;
	type?: string;
	external_reference?: string;
	date_created?: string;
}

/** Hardware terminal registered to the account. */
export interface TerminalDevice {
	id?: string;
	operating_mode?: 'PDV' | 'STANDALONE';
	pos_id?: number;
	status?: 'active' | 'inactive';
	store_id?: string;
}

/** Registered hardware terminals. */
export interface ListTerminalsResponse extends ApiResponse {
	terminals?: TerminalDevice[];
}