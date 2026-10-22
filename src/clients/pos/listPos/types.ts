import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
import type { POS } from '../commonTypes';

export type POSListPosClient = {
	userId: number;
	config: MercadoPagoConfig;
};

export type POSListPosData = {
	userId: number;
	requestOptions?: Options;
};

export type POSListPosResponse = POS[];