import { RestClient } from '@src/utils/restClient';
import { encodePathParam } from '@utils/path';

import type { TerminalsGetTerminalActionClient, TerminalsGetTerminalActionResponse } from './types';

export default function getTerminalAction({ action_id, config }: TerminalsGetTerminalActionClient): Promise<TerminalsGetTerminalActionResponse> {
	return RestClient.fetch<TerminalsGetTerminalActionResponse>(
		`/terminals/v1/actions/${encodePathParam(action_id)}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}