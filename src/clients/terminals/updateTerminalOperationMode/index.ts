import { RestClient } from '@src/utils/restClient';

import type { TerminalsUpdateTerminalOperationModeClient, TerminalsUpdateTerminalOperationModeResponse } from './types';

export default function updateTerminalOperationMode({ body, config }: TerminalsUpdateTerminalOperationModeClient): Promise<TerminalsUpdateTerminalOperationModeResponse> {
	return RestClient.fetch<TerminalsUpdateTerminalOperationModeResponse>('/terminals/v1/setup', {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${config.accessToken}`,
		},
		body: JSON.stringify(body),
		...config.options,
	});
}