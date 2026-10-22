import searchPos from './searchPos';
import createPos from './createPos';
import deletePos from './deletePos';
import getPos from './getPos';
import updatePos from './updatePos';
import listPos from './listPos';

import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { POSSearchData, POSSearchResponse } from './searchPos/types';
import type { POSCreateData } from './createPos/types';
import type { POSDeleteData } from './deletePos/types';
import type { POSGetData } from './getPos/types';
import type { POSUpdateData } from './updatePos/types';
import type { POS as POSResponse } from './commonTypes';

/** Client for creating and searching points of sale. */
export class POS {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	searchPos(data: POSSearchData = {}): Promise<POSSearchResponse> {
		const { options, requestOptions } = data;
		this.config.options = { ...this.config.options, ...requestOptions };
		return searchPos({ options, config: this.config });
	}

	createPos({ body, requestOptions }: POSCreateData): Promise<POSResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createPos({ body, config: this.config });
	}
}