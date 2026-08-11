/**
 * Preference API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing payment preferences (checkout
 * configurations) through the `/checkout/preferences` resource. Preferences
 * define the items, amounts, payment methods, and redirect URLs for a
 * MercadoPago checkout flow.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post MercadoPago Preferences API reference}
 * @module clients/preference
 */

import create from './create';
import get from './get';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreferenceCreateData } from './create/types';
import type { PreferenceGetData, PreferenceResponse } from './get/types';
import type { PreferenceUpdateData } from './update/types';
import type { PreferenceSearchData, PreferenceSearchResponse } from './search/types';

/**
 * Client for the MercadoPago Preferences API.
 *
 * Exposes operations to create, retrieve, update, and search payment
 * preferences that configure the checkout experience for buyers.
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
	 * A preference defines the configuration for a checkout session, including
	 * items, amounts, accepted payment methods, and redirect URLs.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/create.ts Usage Example}.
	 */
	create({ body, requestOptions }: PreferenceCreateData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve a single preference by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/get.ts Usage Example}.
	 */
	get({ preferenceId, requestOptions }: PreferenceGetData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ preferenceId, config: this.config });
	}

	/**
	 * Update an existing preference's configuration.
	 *
	 * Allows modifying items, amounts, redirect URLs, and other preference
	 * settings after initial creation.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/update.ts Usage Example}.
	 */
	update({ id, updatePreferenceRequest, requestOptions }: PreferenceUpdateData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, updatePreferenceRequest, config: this.config });
	}

	/**
	 * Search for preferences using optional filters and pagination.
	 *
	 * Returns a paginated list of preferences matching the specified criteria.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/search.ts Usage Example}.
	 */
	search(preferenceSearchOptions: PreferenceSearchData = {}): Promise<PreferenceSearchResponse> {
		const { options, requestOptions } = preferenceSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}
}