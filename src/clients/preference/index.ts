/**
 * Preference API client for the MercadoPago Node.js SDK.
 *
 * Provides a high-level facade for managing checkout preferences through
 * the `/checkout/preferences` resource. Preferences define the configuration
 * for a checkout flow, including items, payment methods, and URLs.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preferences MercadoPago Preferences API reference}
 * @module clients/preference
 */

import create from './create';
import get from './get';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PreferenceCreateData } from './create/types';
import type { PreferenceGetData } from './get/types';
import type { PreferenceUpdateData } from './update/types';
import type { PreferenceSearchData, PreferenceSearchResponse } from './search/types';
import type { PreferenceResponse } from './commonTypes';

/**
 * Client for the MercadoPago Preferences API.
 *
 * Exposes CRUD operations on checkout preferences, which configure
 * the payment flow for web and mobile checkouts.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preferences API reference}
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
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/create.ts Usage Example }.
	 */
	create({ body, requestOptions }: PreferenceCreateData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve a single preference by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/get.ts Usage Example }.
	 */
	get({ preferenceId, requestOptions }: PreferenceGetData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ preferenceId, config: this.config });
	}

	/**
	 * Update an existing preference's configuration.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/update.ts Usage Example }.
	 */
	update({ id, updatePreferenceRequest, requestOptions }: PreferenceUpdateData): Promise<PreferenceResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, updatePreferenceRequest, config: this.config });
	}

	/**
	 * Search for preferences using optional filters and pagination.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preference/search.ts Usage Example }.
	 */
	search(preferenceSearchOptions: PreferenceSearchData = {}): Promise<PreferenceSearchResponse> {
		const { options, requestOptions } = preferenceSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}
}