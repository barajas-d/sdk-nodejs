import getInstallments from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { PaymentMethod } from '@src/clients/paymentMethod';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('PaymentMethod.getInstallments', () => {
	test('forwards required query parameters without a request body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const response = [{ payment_method_id: 'visa', payer_costs: [{ installments: 1, installment_amount: 100, total_amount: 100 }] }];
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getInstallments({ config, payment_method_id: 'visa', amount: 100 });

		expect(spyFetch).toHaveBeenCalledWith('/v1/payment_methods/installments', {
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
			queryParams: { payment_method_id: 'visa', amount: 100 },
			timeout: 5000
		});
		expect(result).toEqual(response);
	});

	test('exposes getInstallments on PaymentMethod with optional query parameters', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const paymentMethod = new PaymentMethod(config);
		const response = [{ payment_method_id: 'master', payer_costs: [{ installments: 3, total_amount: 120 }] }];
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await paymentMethod.getInstallments({ payment_method_id: 'master', amount: 120, issuer_id: '12', bin: '411111', requestOptions: { timeout: 3000 } });

		expect(spyFetch).toHaveBeenCalledWith('/v1/payment_methods/installments', {
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
			queryParams: { payment_method_id: 'master', amount: 120, issuer_id: '12', bin: '411111' },
			timeout: 3000
		});
		expect(result).toEqual(response);
	});
});