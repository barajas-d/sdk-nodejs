import type { ApiResponse } from '@src/types';

/** Address fields shared by customer address requests and responses. */
export type Address = {
	zip_code?: string;
	street_name?: string;
	street_number?: string;
	city?: string;
	state?: string;
	country?: string;
};

/** Customer address returned by the API. */
export type CustomerAddressResponse = Address & ApiResponse;