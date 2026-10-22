import createPayout from './createPayout';
import listPayoutTransactions from './listPayoutTransactions';
import cancelPayoutTransaction from './cancelPayoutTransaction';
import processTransactionIntent from './processTransactionIntent';
import getTransactionIntent from './getTransactionIntent';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CreatePayoutData } from './createPayout/types';
import type { ListPayoutTransactionsData } from './listPayoutTransactions/types';
import type { CancelPayoutTransactionData } from './cancelPayoutTransaction/types';
import type { ProcessTransactionIntentData } from './processTransactionIntent/types';
import type { GetTransactionIntentData } from './getTransactionIntent/types';

/** Client for creating payout batches and managing their transactions. */
export class Payouts {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	createPayout({ body, requestOptions }: CreatePayoutData): Promise<unknown> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createPayout({ body, config: this.config });
	}

	listPayoutTransactions({ payout_id, requestOptions }: ListPayoutTransactionsData): Promise<unknown> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return listPayoutTransactions({ payout_id, config: this.config });
	}

	cancelPayoutTransaction({ payout_id, transaction_id, requestOptions }: CancelPayoutTransactionData): Promise<unknown> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancelPayoutTransaction({ payout_id, transaction_id, config: this.config });
	}

	processTransactionIntent({ body, requestOptions }: ProcessTransactionIntentData): Promise<unknown> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return processTransactionIntent({ body, config: this.config });
	}
}