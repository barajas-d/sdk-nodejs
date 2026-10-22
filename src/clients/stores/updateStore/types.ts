import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { Store } from '../commonTypes';

/** Store fields accepted when updating an existing store. */
export interface StoreRequest {
	name: string;
	external_id?: string;
	location?: {
		street_number?: string;
		street_name?: string;
		city_name?: string;
		state_name?: string;
		zip_code?: string;
		latitude?: number;
		longitude?: number;
	};
	business_hours?: {
		monday?: Array<{ open?: string; close?: string }>;
	};
}

export interface StoresUpdateStoreData {
	user_id: number;
	id: string;
	body: StoreRequest;
	requestOptions?: Options;
}

export interface StoresUpdateStoreClient extends StoresUpdateStoreData {
	config: MercadoPagoConfig;
}

export type StoresUpdateStoreResponse = Store;