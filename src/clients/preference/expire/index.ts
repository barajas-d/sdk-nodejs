/**
 * Implementation of the preference expiration operation.
 *
 * Sends a PUT request to `/checkout/preferences/:id/expire` to mark an
 * existing preference as expired, preventing it from being used for new
 * checkouts.
 *
 * @module clients/preference/expire
 */

import { RestClient } from '@utils/restClient';

import type { PreferenceExpireClient } from './types';
import type { PreferenceResponse } from '../get/types';

/**
 * Expire a preference by its unique identifier.
 *
 * Once expired, the preference can no longer be used to initiate new
 * payments. Existing payments created from the preference remain
 * unaffected.
 *
 * @returns The updated preference record with expired status.
 */
export default function expire({ id, config }: PreferenceExpireClient): Promise<PreferenceResponse> {
	return RestClient.fetch<PreferenceResponse>(
		`/checkout/preferences/${id}/expire`,
		{
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			method: 'PUT',
			...config.options
		}
	);
}