/**
 * Preference API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing payment preferences through
 * the `/checkout/preferences` resource. A preference defines the products,
 * amounts, and payment configuration for a MercadoPago checkout flow.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post MercadoPago Preferences API reference}
 * @module clients/preference
 */

import create from './create';
import get from './get';
import update from './update';
import search from './search';
import expire from './expire';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreferenceResponse } from './commonTypes';
import type { PreferenceCreateData } from './create/types';
import type { PreferenceGetData } from './get/types';
import type { PreferenceUpdateData } from './update/types';
import type { PreferenceSearchData, PreferenceSearchResponse } from './search/types';
import type { PreferenceExpireData } from './expire/types';

/**
 * Client for the MercadoPago Preferences API.
 *
 * Exposes CRUD operations on payment preferences, which define the products,
 * amounts, and configuration for a checkout session.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post API reference}
 */
export class Preference {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new payment preference.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/create.ts Usage Example}.
	 */
	create({ body, requestOptions }: PreferenceCreateData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve a single payment preference by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/get.ts Usage Example}.
	 */
	get({ preferenceId, requestOptions }: PreferenceGetData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ preferenceId, config: this.config });
	}

	/**
	 * Update an existing payment preference.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/update.ts Usage Example}.
	 */
	update({ id, updatePreferenceRequest, requestOptions }: PreferenceUpdateData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, updatePreferenceRequest, config: this.config });
	}

	/**
	 * Search for payment preferences using optional filters and pagination.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/search.ts Usage Example}.
	 */
	search(preferenceSearchOptions: PreferenceSearchData = {}): Promise<PreferenceSearchResponse> {
		const { options, requestOptions } = preferenceSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

	/**
	 * Expire a payment preference by its ID.
	 *
	 * Once expired, the preference can no longer be used to create new payments.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/expire.ts Usage Example}.
	 */
	expire({ id, requestOptions }: PreferenceExpireData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return expire({ id, config: this.config });
	}
}