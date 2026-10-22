import getStore from './getStore';
import createStore from './createStore';
import searchStores from './searchStores';
import deleteStore from './deleteStore';
import updateStore from './updateStore';
import type { Store } from './commonTypes';
import type { StoresGetStoreData } from './getStore/types';
import type { StoresCreateStoreData } from './createStore/types';
import type { StoresSearchStoresData, StoresSearchStoresResponse } from './searchStores/types';
import type { StoresDeleteStoreData, StoresDeleteStoreResponse } from './deleteStore/types';
import type { StoresUpdateStoreData } from './updateStore/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export class Stores {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	getStore({ id, requestOptions }: StoresGetStoreData): Promise<Store> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getStore({ id, config: this.config });
	}
}