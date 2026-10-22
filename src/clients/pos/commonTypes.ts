import type { ApiResponse } from '@src/types';

/** Payload for creating a point of sale in a store. */
export interface POSRequest {
	name: string;
	store_id: string;
	external_id?: string;
	external_store_id?: string;
	fixed_amount?: boolean;
	category?: number;
	url?: string;
}

/** A point of sale and its QR code. */
export interface POS extends ApiResponse {
	id?: number;
	name?: string;
	store_id?: string;
	external_id?: string;
	external_store_id?: string;
	fixed_amount?: boolean;
	category?: number;
	qr_code?: string;
	qr_code_image?: string;
	date_created?: string;
	date_last_updated?: string;
}

/** Pagination metadata for POS searches. */
export interface Pagination {
	total?: number;
	limit?: number;
	offset?: number;
}