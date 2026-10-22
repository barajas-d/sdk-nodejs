import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

/** A terminal and its requested operating mode. */
export interface TerminalOperationMode {
	id: string;
	operating_mode: 'PDV' | 'STANDALONE';
}

/** Payload for changing one or more terminal operating modes. */
export interface TerminalsUpdateTerminalOperationModeRequest {
	terminals: TerminalOperationMode[];
}

/** The endpoint does not document a response body. */
export type TerminalsUpdateTerminalOperationModeResponse = ApiResponse;

export interface TerminalsUpdateTerminalOperationModeData {
	body: TerminalsUpdateTerminalOperationModeRequest;
	requestOptions?: Options;
}

export interface TerminalsUpdateTerminalOperationModeClient {
	body: TerminalsUpdateTerminalOperationModeRequest;
	config: MercadoPagoConfig;
}