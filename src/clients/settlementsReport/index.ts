import updateSettlementReportConfig from './updateSettlementReportConfig';
import listScheduledSettlementReports from './listScheduledSettlementReports';
import disableSettlementReportSchedule from './disableSettlementReportSchedule';
import enableSettlementReportSchedule from './enableSettlementReportSchedule';
import searchSettlementReports from './searchSettlementReports';
import getSettlementReportTask from './getSettlementReportTask';
import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { UpdateSettlementReportConfigData, ReportConfig } from './updateSettlementReportConfig/types';
import type { ListScheduledSettlementReportsData, ReportListResult } from './listScheduledSettlementReports/types';
import type { DisableSettlementReportScheduleData } from './disableSettlementReportSchedule/types';
import type { EnableSettlementReportScheduleData } from './enableSettlementReportSchedule/types';
import type { SearchSettlementReportsData } from './searchSettlementReports/types';
import type { GetSettlementReportTaskData } from './getSettlementReportTask/types';
import type { ReportTask } from './commonTypes';
import type { ApiResponse } from '@src/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/** Client for settlements report operations. */
export class SettlementsReport {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}
}