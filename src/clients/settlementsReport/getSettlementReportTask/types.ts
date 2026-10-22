import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Parameters for retrieving a settlements report task. */
export type GetSettlementReportTaskData = {
	taskId: string;
	requestOptions?: Options;
};

/** Internal arguments for the task retrieval operation. */
export type GetSettlementReportTaskClient = GetSettlementReportTaskData & {
	config: MercadoPagoConfig;
};