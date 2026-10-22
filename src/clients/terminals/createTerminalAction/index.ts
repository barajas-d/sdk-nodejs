import { RestClient } from '@src/utils/restClient';

import type { TerminalsCreateTerminalActionClient, TerminalsCreateTerminalActionResponse } from './types';

export default function createTerminalAction({ body, config }: TerminalsCreateTerminalActionClient): Promise<TerminalsCreateTerminalActionResponse> {
	return RestClient.fetch<TerminalsCreateTerminalActionResponse>(
		'/terminals/v1/actions',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options,
		}
	);
}