import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import updateReleaseReportConfig from './updateReleaseReportConfig';
import listScheduledReleaseReports from './listScheduledReleaseReports';
import disableReleaseReportSchedule from './disableReleaseReportSchedule';
import enableReleaseReportSchedule from './enableReleaseReportSchedule';
import type { UpdateReleaseReportConfigData } from './updateReleaseReportConfig/types';
import type { ListScheduledReleaseReportsData } from './listScheduledReleaseReports/types';
import type { DisableReleaseReportScheduleData } from './disableReleaseReportSchedule/types';
import type { EnableReleaseReportScheduleData } from './enableReleaseReportSchedule/types';
import searchReleaseReports from './searchReleaseReports';
import getReleaseReportTask from './getReleaseReportTask';
import type { SearchReleaseReportsData } from './searchReleaseReports/types';
import type { GetReleaseReportTaskData } from './getReleaseReportTask/types';
import downloadReleaseReport from './downloadReleaseReport';
import type { DownloadReleaseReportData } from './downloadReleaseReport/types';

/** Client for releases reports and their configuration. */
export class ReleasesReport {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/** Download a generated releases report as CSV. */
	downloadReleaseReport({ requestOptions, ...data }: DownloadReleaseReportData) {
		this.config.options = { ...this.config.options, ...requestOptions };
		return downloadReleaseReport({ ...data, config: this.config });
	}
}