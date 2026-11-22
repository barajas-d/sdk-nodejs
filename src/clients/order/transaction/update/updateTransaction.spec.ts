import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { OrderUpdateTransactionClient } from './types';
import { PaymentApiResponse, PaymentRequest } from '../../commonTypes';
import updateTransaction from '.';

jest.mock('@utils/restClient');

describe('Update Order transaction', () => {
	test('should update Order transaction', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockRequestBody: PaymentRequest = {
			payment_method: {
				installments: 3,
			}
		};
		const orderId = '01JE3XD9V38N19CSFH40K6G3EY';
		const transactionId = 'pay_01JE3XD9V38N19CSFH443VVHAJ';
		const mockUpdate: OrderUpdateTransactionClient = {
			id: orderId,
			transactionId,
			body: mockRequestBody,
			config
		};
		const mockResponse: PaymentApiResponse = {
			api_response: {
				status: 200,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			payment_method: {
				installments: 3,
			},
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

		const updatedTransaction = await updateTransaction(mockUpdate);

		expect(spyFetch).toHaveBeenCalledWith(`/v1/orders/${orderId}/transactions/${transactionId}`,
			{
				body: JSON.stringify(mockRequestBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'PUT',
				timeout: 5000
			}
		);
		expect(updatedTransaction).toEqual(mockResponse);
	});
});

describe('Public Order.updateTransaction payment method contract', () => {
	test('serializes financial_institution and returns typed financial institution and installment amount with SDK metadata', async () => {
		const { Order } = await import('../..');
		const body: PaymentRequest = {
			payment_method: { id: 'master', financial_institution: 'bank-456' }
		};
		const responseMethod: import('../../commonTypes').PaymentMethodResponse = {
			id: 'master', financial_institution: 'bank-456', installment_amount: '25.00'
		};
		const fixture: PaymentApiResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			payment_method: responseMethod
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: PaymentApiResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' }))
			.updateTransaction({ id: 'ORD-PUT', transactionId: 'PAY-PUT', body });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-PUT/transactions/PAY-PUT', expect.objectContaining({
			method: 'PUT', body: JSON.stringify(body)
		}));
		expect(JSON.parse((RestClient.fetch as jest.Mock).mock.calls[0][1].body).payment_method.financial_institution).toBe('bank-456');
		expect(result.api_response).toEqual({ status: 200, headers: ['Content-Type', ['application/json']] });
		expect(result.payment_method.financial_institution).toBe('bank-456');
		expect(result.payment_method.installment_amount).toBe('25.00');
	});
});
