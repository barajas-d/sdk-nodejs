export type POSRequest = {
	name: string;
	store_id: string;
	external_id?: string;
	external_store_id?: string;
	category?: number;
	fixed_amount?: boolean;
	url?: string;
};

export type POSResponse = POSRequest & {
	id?: string;
	qr_code?: string;
	qr_code_image?: string;
	date_created?: string;
	date_last_updated?: string;
};
