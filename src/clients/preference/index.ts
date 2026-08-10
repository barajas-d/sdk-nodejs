/**
 * Preference API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing checkout preferences through
 * the `/checkout/preferences` resource. Preferences define the configuration
 * for a payment flow, including items, payment methods, and redirect URLs.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post MercadoPago Preferences API reference}
 * @module clients/preference
 */

import create from './create';
import get from './get';
import search from './search';
import update from './update';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreferenceCreateData } from './create/types';
import type { PreferenceGetData, PreferenceResponse } from './get/types';
import type { PreferenceSearchData, PreferenceSearchResponse } from './search/types';
import type { PreferenceUpdateData } from './update/types';

/**
 * Client for the MercadoPago Preferences API.
 *
 * Exposes CRUD operations (except delete) on checkout preferences, which
 * define the payment flow configuration including items, payer info,
 * payment methods, and callback URLs.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post API reference}
 */
export class Preference {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new checkout preference.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/preference/create.ts Usage Example}.
	 */
	create({ body, requestOptions }: PreferenceCreateData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve a single preference by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/preference/get.ts Usage Example}.
	 */
	get({ preferenceId, requestOptions }: PreferenceGetData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ preferenceId, config: this.config });
	}

	/**
	 * Update an existing checkout preference.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/preference/update.ts Usage Example}.
	 */
	update({ id, updatePreferenceRequest, requestOptions }: PreferenceUpdateData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, updatePreferenceRequest, config: this.config });
	}

	/**
	 * Search for preferences using optional filters and pagination.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/examples/preference/search.ts Usage Example}.
	 */
	search(preferenceSearchOptions: PreferenceSearchData = {}): Promise<PreferenceSearchResponse> {
		const { options, requestOptions } = preferenceSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}
}