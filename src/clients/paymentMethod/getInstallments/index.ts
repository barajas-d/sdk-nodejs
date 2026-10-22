import { RestClient } from '@utils/restClient';

import type { PaymentMethodGetInstallmentsClient, PaymentMethodInstallmentOption } from './types';

/** Retrieve installment options for a payment method and amount. */
export default function getInstallments({ config, payment_method_id, amount, issuer_id, bin }: PaymentMethodGetInstallmentsClient): Promise<PaymentMethodInstallmentOption[]> {
	return RestClient.fetch<PaymentMethodInstallmentOption[]>(
		'/v1/payment_methods/installments',
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`
			},
			queryParams: {
				payment_method_id,
				amount,
				...(issuer_id !== undefined ? { issuer_id } : {}),
				...(bin !== undefined ? { bin } : {})
			},
			...config.options
		}
	);
}