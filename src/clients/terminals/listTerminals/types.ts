import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

export type TerminalsListTerminalsClient = {
	config: MercadoPagoConfig;
};

export type TerminalsListTerminalsData = {
	requestOptions?: Options;
};

export type TerminalsListTerminalsResponse = {
	terminals?: {
		id?: string;
		operating_mode?: 'PDV' | 'STANDALONE';
		pos_id?: number;
		status?: 'active' | 'inactive';
		store_id?: string;
	}[];
};