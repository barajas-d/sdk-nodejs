import type { ApiResponse } from '@src/types';

/** A reason for opening a post-purchase claim. */
export interface ClaimReason extends ApiResponse {
	id: string;
	name?: string;
	description?: string;
}

/** Details of a post-purchase claim. */
export interface Claim extends ApiResponse {
	id: number;
	type?: string;
	stage?: string;
	status?: string;
}

/** Paginated claim search results. */
export interface ClaimSearchResult extends ApiResponse {
	data: Claim[];
	paging?: {
		limit?: number;
		offset?: number;
		total?: number;
	};
}