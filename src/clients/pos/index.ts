import searchPos from './searchPos';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { POSSearchData, POSSearchResponse } from './searchPos/types';

/** Client for searching MercadoPago points of sale. */
export class POS {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/** Search registered points of sale using optional query filters and per-request HTTP options. */
	/** Per-call requestOptions are merged into the SDK configuration before the search is sent. */
	searchPos(posSearchData: POSSearchData = {}): Promise<POSSearchResponse> {
		const { options, requestOptions } = posSearchData;
		this.config.options = { ...this.config.options, ...requestOptions };
		return searchPos({ options, config: this.config });
	}
}
