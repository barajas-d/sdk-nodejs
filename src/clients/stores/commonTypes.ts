import type { ApiResponse } from '@src/types';

/** A store returned by the Stores API. */
export interface Store extends ApiResponse {
	id?: string;
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
	date_created?: string;
	date_last_updated?: string;
}