import { RestClient } from '@src/utils/restClient';
import { encodePathParam } from '@utils/path';

import type { TerminalsCancelTerminalActionClient } from './types';

export default function cancelTerminalAction({ action_id, config }: TerminalsCancelTerminalActionClient): Promise<void> {
	return RestClient.fetch<void>(
		`/terminals/v1/actions/${encodePathParam(action_id)}/cancel`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}