import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options, ApiResponse } from '@src/types';

/** Parameters for deleting a store by its user and store identifiers. */
export interface StoresDeleteStoreData {
	user_id: number;
	id: string;
	requestOptions?: Options;
}

/** Internal request passed to the delete-store operation. */
export interface StoresDeleteStoreClient {
	user_id: number;
	id: string;
	config: MercadoPagoConfig;
}

/** The delete endpoint does not document a response body. */
export type StoresDeleteStoreResponse = ApiResponse;