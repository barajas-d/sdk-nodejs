import confirmCashoutQr from './confirmCashoutQr';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { QROrdersConfirmCashoutQrData, QROrdersConfirmCashoutQrResponse } from './confirmCashoutQr/types';

export class QROrders {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	confirmCashoutQr({ merchantOrderId, body, requestOptions }: QROrdersConfirmCashoutQrData): Promise<QROrdersConfirmCashoutQrResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return confirmCashoutQr({ merchantOrderId, body, config: this.config });
	}
}