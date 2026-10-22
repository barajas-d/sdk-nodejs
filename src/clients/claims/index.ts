import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse } from '@src/types';
import requestClaimMediation from './requestClaimMediation';
import sendClaimMessage from './sendClaimMessage';
import getClaimFile from './getClaimFile';
import downloadClaimFile from './downloadClaimFile';
import attachClaimFile from './attachClaimFile';
import getClaimEvidence from './getClaimEvidence';
import type { RequestClaimMediationData } from './requestClaimMediation/types';
import type { SendClaimMessageData } from './sendClaimMessage/types';
import type { GetClaimFileData, ClaimFile } from './getClaimFile/types';
import type { DownloadClaimFileData, DownloadedClaimFile } from './downloadClaimFile/types';
import type { AttachClaimFileData, ClaimAttachment } from './attachClaimFile/types';
import type { GetClaimEvidenceData, ClaimEvidence } from './getClaimEvidence/types';
import getClaimMediationResolutions from './getClaimMediationResolutions';
import getClaimMessages from './getClaimMessages';
import getClaimHistory from './getClaimHistory';
import type { GetClaimMediationResolutionsData, MediationResolution } from './getClaimMediationResolutions/types';
import type { GetClaimMessagesData, ClaimMessage } from './getClaimMessages/types';
import type { GetClaimHistoryData, ClaimHistoryEntry } from './getClaimHistory/types';

/** Claims client for post-purchase claims operations. */
export class Claims {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	requestClaimMediation({ claimId, requestOptions }: RequestClaimMediationData): Promise<ApiResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return requestClaimMediation({ claimId, config: this.config });
	}

	sendClaimMessage({ claimId, applicationId, body, requestOptions }: SendClaimMessageData): Promise<ApiResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return sendClaimMessage({ claimId, applicationId, body, config: this.config });
	}

	getClaimFile({ claimId, fileName, requestOptions }: GetClaimFileData): Promise<ClaimFile> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getClaimFile({ claimId, fileName, config: this.config });
	}

	getClaimEvidence({ claimId, requestOptions }: GetClaimEvidenceData): Promise<ClaimEvidence[]> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getClaimEvidence({ claimId, config: this.config });
	}
}
