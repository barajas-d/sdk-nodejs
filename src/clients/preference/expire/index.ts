/**
 * Implementation of the preference expiration operation.
 *
 * Sends a PUT request to `/checkout/preferences/:id/expire` to expire
 * an existing preference, preventing it from accepting further payments.
 *
 * @module clients/preference/expire
 */

import { RestClient } from '@utils/restClient';

import type { PreferenceExpireClient } from './types';
import type { PreferenceResponse } from '../commonTypes';

/**
 * Expire a preference by its unique identifier.
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