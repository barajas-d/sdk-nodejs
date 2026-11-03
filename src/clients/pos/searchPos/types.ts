import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { POSResponse } from '../commonTypes';

/** Optional filters sent as query parameters to GET /pos. */
export type POSSearchOptions = {
	external_id?: string;
	external_store_id?: string;
	store_id?: string;
	category?: number;
};

/** Public input to POS.searchPos. */
export type POSSearchData = {
	options?: POSSearchOptions;
	requestOptions?: Options;
};

/** Internal input to the search operation. */
export type POSSearchClient = {
	options?: POSSearchOptions;
	config: MercadoPagoConfig;
};

/** Pagination metadata returned with the matching points of sale. */
export type POSSearchPagination = {
	total?: number;
	limit?: number;
	offset?: number;
};

/** JSON response from GET /pos. */
export type POSSearchResponse = {
	paging?: POSSearchPagination;
	results?: POSResponse[];
};
