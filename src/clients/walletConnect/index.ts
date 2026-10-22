import createWalletAgreement from './createWalletAgreement';
import deleteWalletAgreement from './deleteWalletAgreement';
import getWalletAgreement from './getWalletAgreement';
import createWalletPayerToken from './createWalletPayerToken';
import validateWalletCoupon from './validateWalletCoupon';
import createWalletDiscount from './createWalletDiscount';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { WalletAgreementCreateData, WalletAgreementCreateResponse } from './createWalletAgreement/types';
import type { WalletAgreementDeleteData, WalletAgreementDeleteResponse } from './deleteWalletAgreement/types';
import type { WalletAgreementGetData, WalletAgreementGetResponse } from './getWalletAgreement/types';
import type { WalletPayerTokenCreateData, WalletPayerTokenCreateResponse } from './createWalletPayerToken/types';
import type { WalletCouponValidateData, WalletCouponValidateResponse } from './validateWalletCoupon/types';
import type { WalletDiscountCreateData, WalletDiscountCreateResponse } from './createWalletDiscount/types';

export class WalletConnect {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	createWalletAgreement({ body, requestOptions }: WalletAgreementCreateData): Promise<WalletAgreementCreateResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createWalletAgreement({ body, config: this.config });
	}

	deleteWalletAgreement({ agreementId, requestOptions }: WalletAgreementDeleteData): Promise<WalletAgreementDeleteResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return deleteWalletAgreement({ agreementId, config: this.config });
	}

	getWalletAgreement({ agreementId, requestOptions }: WalletAgreementGetData): Promise<WalletAgreementGetResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getWalletAgreement({ agreementId, config: this.config });
	}

	createWalletPayerToken({ agreementId, body, requestOptions }: WalletPayerTokenCreateData): Promise<WalletPayerTokenCreateResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createWalletPayerToken({ agreementId, body, config: this.config });
	}
}