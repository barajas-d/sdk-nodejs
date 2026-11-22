import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import process from './index';
import { OrderResponse } from '../commonTypes';

jest.mock('@utils/restClient');

describe('Process Order', () => {
	test('should process Order', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JDWFFTAJ5S3G6JDNQ4T66FBN';
		const mockOrderResponse: OrderResponse = {
			api_response: {
				status: 200,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			id: orderId,
			type: 'online',
			processing_mode: 'manual',
			status: 'processed',
			status_detail: 'accredited',
			total_amount: '200.00',
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);
		
		const result = await process({ id: orderId, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JDWFFTAJ5S3G6JDNQ4T66FBN/process',
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer access_token',
				}
			}
		);
		expect(result).toEqual(mockOrderResponse);
	});
});

describe('Public Order.process successful responses', () => {
	test('returns the processed Checkout API payment and HTTP metadata through the public method', async () => {
		const { Order } = await import('..');
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-CHECKOUT-PROCESS',
			type: 'online',
			processing_mode: 'manual',
			status: 'processed',
			status_detail: 'accredited',
			transactions: {
				payments: [{
					id: 'PAY-CHECKOUT-PROCESS',
					status: 'processed',
					status_detail: 'accredited',
					amount: '200.00',
					paid_amount: '200.00',
					payment_method: { id: 'visa', type: 'credit_card', installments: 2 }
				}]
			}
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(config).process({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-CHECKOUT-PROCESS/process', expect.objectContaining({ method: 'POST' }));
		expect(result.api_response).toEqual({ status: 200, headers: ['Content-Type', ['application/json']] });
		expect(result.status).toBe('processed');
		expect(result.transactions.payments[0].status).toBe('processed');
		expect(result.transactions.payments[0].paid_amount).toBe('200.00');
		expect(result.transactions.payments[0].payment_method.installments).toBe(2);
	});

	test('returns Checkout API processing taxes and installment amount through the public method', async () => {
		const { Order } = await import('..');
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-CHECKOUT-TAX-PROCESS',
			type: 'online',
			processing_mode: 'manual',
			status: 'processed',
			status_detail: 'accredited',
			transactions: {
				payments: [{
					id: 'PAY-CHECKOUT-TAX-PROCESS',
					status: 'processed',
					status_detail: 'accredited',
					amount: '200.00',
					paid_amount: '200.00',
					taxes_amount: '10.00',
					payment_method: { id: 'visa', type: 'credit_card', installments: 2, installment_amount: '100.00' }
				}]
			}
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(config).process({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-CHECKOUT-TAX-PROCESS/process', expect.objectContaining({ method: 'POST' }));
		expect(result.api_response).toEqual({ status: 200, headers: ['Content-Type', ['application/json']] });
		expect(result.status).toBe('processed');
		expect(result.transactions.payments[0].status).toBe('processed');
		expect(result.transactions.payments[0].taxes_amount).toBe('10.00');
		expect(result.transactions.payments[0].payment_method.installment_amount).toBe('100.00');
	});
});