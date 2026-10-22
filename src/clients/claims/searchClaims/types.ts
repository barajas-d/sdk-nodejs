import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { Claim } from '../commonTypes';

export type ClaimsSearchOptions = {
	id?: number;
	type?: 'mediations' | 'claims';
	stage?: 'claim' | 'dispute' | 'resolution';
	status?: 'opened' | 'closed' | 'cancelled';
	limit?: number;
	offset?: number;
};

export type ClaimsSearchData = {
	options?: ClaimsSearchOptions;
	requestOptions?: Options;
};

export type ClaimsSearchClient = {
	options?: ClaimsSearchOptions;
	config: MercadoPagoConfig;
};

export type ClaimsSearchResponse = {
	paging: {
		total: number;
		limit: number;
		offset: number;
	};
	results: Claim[];
};