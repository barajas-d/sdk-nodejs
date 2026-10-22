import getQrIntegratorConfig from './getQrIntegratorConfig';
import createQrIntegratorConfig from './createQrIntegratorConfig';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { QRIntegratorGetData, QRIntegratorGetResponse } from './getQrIntegratorConfig/types';
import type { QRIntegratorCreateData, QRIntegratorCreateResponse } from './createQrIntegratorConfig/types';

/** Client for QR in-store integrator configuration. */
export class QRIntegrator {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	getQrIntegratorConfig({ requestOptions }: QRIntegratorGetData = {}): Promise<QRIntegratorGetResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getQrIntegratorConfig({ config: this.config });
	}

	createQrIntegratorConfig({ body, requestOptions }: QRIntegratorCreateData): Promise<QRIntegratorCreateResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createQrIntegratorConfig({ body, config: this.config });
	}
}