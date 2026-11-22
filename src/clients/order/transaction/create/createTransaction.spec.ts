import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { OrderCreateTransactionClient, OrderCreateTransactionRequest } from './types';
import createTransaction from '.';
import { TransactionsApiResponse } from '../../commonTypes';

jest.mock('@utils/restClient');

describe('Create Order transaction', () => {
	test('should create Order transaction', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockRequestBody: OrderCreateTransactionRequest = {
			payments: [
				{
					amount: '100.00',
					payment_method: {
						id: 'master',
						type: 'credit_card',
						token: 'card_token',
						installments: 1,
					},
				}
			]
		};
		const orderId = '01JE3XD9V38N19CSFH40K6G3EY';
		const mockCreate: OrderCreateTransactionClient = {
			id: orderId,
			body: mockRequestBody,
			config
		};
		const mockResponse: TransactionsApiResponse = {
			api_response: {
				status: 201,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			payments: [
				{
					id: 'pay_01JE3XD9V38N19CSFH443VVHAJ',
					amount: '100.00',
					payment_method: {
						id: 'master',
						type: 'credit_card',
						installments: 1,
					}
				}
			]
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

		const createdTransaction = await createTransaction(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith(`/v1/orders/${orderId}/transactions`,
			{
				body: JSON.stringify(mockRequestBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'POST',
				timeout: 5000
			}
		);
		expect(createdTransaction).toEqual(mockResponse);
	});
});

describe('Public Order transaction payment methods', () => {
	test('transmits the typed POST request and returns typed payment method details with SDK metadata', async () => {
		const { Order } = await import('../..');
		const body: OrderCreateTransactionRequest = {
			payments: [{ amount: '100.00', payment_method: { id: 'master', financial_institution: 'bank-123' } }]
		};
		const responseMethod: import('../../commonTypes').PaymentMethodResponse = {
			id: 'master', financial_institution: 'bank-123', installment_amount: '50.00'
		};
		const fixture: TransactionsApiResponse = {
			api_response: { status: 201, headers: ['Content-Type', ['application/json']] },
			payments: [{ id: 'PAY-POST', amount: '100.00', payment_method: responseMethod }]
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: TransactionsApiResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' }))
			.createTransaction({ id: 'ORD-POST', body });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-POST/transactions', expect.objectContaining({
			method: 'POST', body: JSON.stringify(body)
		}));
		expect(JSON.parse((RestClient.fetch as jest.Mock).mock.calls[0][1].body).payments[0].payment_method.financial_institution).toBe('bank-123');
		expect(result.api_response).toEqual({ status: 201, headers: ['Content-Type', ['application/json']] });
		expect(result.payments[0].payment_method.financial_institution).toBe('bank-123');
		expect(result.payments[0].payment_method.installment_amount).toBe('50.00');
	});

	test('transmits the typed PUT request and returns typed payment method details with SDK metadata', async () => {
		const { Order } = await import('../..');
		const body: import('../../commonTypes').PaymentRequest = {
			payment_method: { id: 'master', financial_institution: 'bank-456' }
		};
		const responseMethod: import('../../commonTypes').PaymentMethodResponse = {
			id: 'master', financial_institution: 'bank-456', installment_amount: '25.00'
		};
		const fixture: import('../../commonTypes').PaymentApiResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			payment_method: responseMethod
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: import('../../commonTypes').PaymentApiResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' }))
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
