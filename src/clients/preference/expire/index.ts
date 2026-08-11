/**
 * Implementation of the preference expiration operation.
 *
 * Sends a PUT request to `/checkout/preferences/:id/expire` to mark
 * a preference as expired, preventing it from being used for new payments.
 *
 * @module clients/preference/expire
 */

import { RestClient } from '@utils/restClient';

import type { PreferenceExpireClient } from './types';
import type { PreferenceResponse } from '../commonTypes';

/**
 * Expire a payment preference by its unique identifier.
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