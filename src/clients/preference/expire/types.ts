/**
 * Request and internal types for the preference expiration operation.
 *
 * @module clients/preference/expire/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/**
 * Public-facing input for {@link Preference.expire}.
 */
export declare type PreferenceExpireData = {
  /** Unique preference identifier assigned by MercadoPago. */
  id: number;
  /** Per-request options such as timeout or idempotency key. */
  requestOptions?: Options;
};

/**
 * Internal payload forwarded to the `expire` REST implementation.
 */
export declare type PreferenceExpireClient = {
  /** Unique preference identifier assigned by MercadoPago. */
  id: number;
  /** SDK configuration including access token and global options. */
  config: MercadoPagoConfig;
};