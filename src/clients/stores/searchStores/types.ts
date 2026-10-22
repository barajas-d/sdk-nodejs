import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';
import type { Store } from '../commonTypes';

export type StoresSearchStoresClient = {
	userId: number;
	externalId?: string;
	config: MercadoPagoConfig;
};

export type StoresSearchStoresData = {
	userId: number;
	externalId?: string;
	requestOptions?: Options;
};

export interface StoresSearchStoresResponse extends ApiResponse {
	paging?: {
		total?: number;
		offset?: number;
		limit?: number;
	};
	results?: Store[];
}