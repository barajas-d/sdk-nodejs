import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** JSON payload for creating a store. */
export interface StoreCreateRequest {
	name: string;
	external_id?: string;
	business_hours?: {
		monday?: Array<{ open?: string; close?: string }>;
	};
	location?: {
		street_number?: string;
		street_name?: string;
		city_name?: string;
		state_name?: string;
		zip_code?: string;
		latitude?: number;
		longitude?: number;
	};
}

export interface StoresCreateStoreData {
	user_id: number;
	body: StoreCreateRequest;
	requestOptions?: Options;
}

export interface StoresCreateStoreClient extends StoresCreateStoreData {
	config: MercadoPagoConfig;
}