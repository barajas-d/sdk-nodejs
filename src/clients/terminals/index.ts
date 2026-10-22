import createPointRefundIntent from './createPointRefundIntent';
import cancelPointRefundIntent from './cancelPointRefundIntent';
import getPointRefundIntent from './getPointRefundIntent';
import createTerminalAction from './createTerminalAction';
import getTerminalAction from './getTerminalAction';
import cancelTerminalAction from './cancelTerminalAction';
import listTerminals from './listTerminals';
import updateTerminalOperationMode from './updateTerminalOperationMode';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { TerminalsCreatePointRefundIntentData, TerminalsCreatePointRefundIntentResponse } from './createPointRefundIntent/types';
import type { TerminalsCancelPointRefundIntentData } from './cancelPointRefundIntent/types';
import type { TerminalsGetPointRefundIntentData, TerminalsGetPointRefundIntentResponse } from './getPointRefundIntent/types';
import type { TerminalsUpdateTerminalOperationModeData, TerminalsUpdateTerminalOperationModeResponse } from './updateTerminalOperationMode/types';

export class Terminals {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	createPointRefundIntent({ deviceid, body, requestOptions }: TerminalsCreatePointRefundIntentData): Promise<TerminalsCreatePointRefundIntentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createPointRefundIntent({ deviceid, body, config: this.config });
	}

	cancelPointRefundIntent({ deviceid, refundintentid, requestOptions }: TerminalsCancelPointRefundIntentData): Promise<void> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancelPointRefundIntent({ deviceid, refundintentid, config: this.config });
	}

	getPointRefundIntent({ refundintentid, requestOptions }: TerminalsGetPointRefundIntentData): Promise<TerminalsGetPointRefundIntentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getPointRefundIntent({ refundintentid, config: this.config });
	}
}