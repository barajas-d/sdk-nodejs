import { RestClient } from '@src/utils/restClient';

import type { TerminalsListTerminalsClient, TerminalsListTerminalsResponse } from './types';

export default function listTerminals({ config }: TerminalsListTerminalsClient): Promise<TerminalsListTerminalsResponse> {
	return RestClient.fetch<TerminalsListTerminalsResponse>(
		'/terminals/v1/list',
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}