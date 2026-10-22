import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { POS, Pagination } from '../commonTypes';

/** Optional query filters for GET /pos. */
export type POSSearchOptions = {
	external_id?: string;
	external_store_id?: string;
	store_id?: string;
	category?: number;
};

export type POSSearchClient = {
	options?: POSSearchOptions;
	config: MercadoPagoConfig;
};

export type POSSearchData = {
	options?: POSSearchOptions;
	requestOptions?: Options;
};

export type POSSearchResponse = {
	paging: Pagination;
	results: POS[];
};