import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { OrderResponse } from '../commonTypes';
import refund from './index';
import { RefundRequest } from './types';

jest.mock('@utils/restClient');

describe('Refund Total Order', () => {
	test('should refund an Order totally', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JE6EZVK4FGMM4AYVQF23K17B';
		const mockOrderResponse: OrderResponse = {
			api_response: {
				status: 201,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			id: orderId,
			status: 'refunded',
			status_detail: 'refunded',
			transactions: {
				refunds: [
					{
						id: 'ref_01JE6F05C365ADF8JSJ3W92FJ5',
						transaction_id: 'pay_01JE6EZVK4FGMM4AYVQGSGDG9W',
						reference_id: '01JE6F04N2RE5KEAK4HYYPJ4AK',
						amount: '100.00',
						status: 'processed',
					}
				]
			}
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);

		const result = await refund({ id: orderId, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JE6EZVK4FGMM4AYVQF23K17B/refund',
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer access_token',
				}
			}
		);
		expect(result).toEqual(mockOrderResponse);
	});

	test('should refund an Order partially', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JE6T2CWF7FDDD08HJNXBKM37';
		const refundRequest: RefundRequest = {
			transactions: [
				{
					id: 'pay_01JE6T2CWF7FDDD08HJS8DTAXR',
					amount: '25.00'
				}
			]
		};
		const mockOrderResponse: OrderResponse = {
			api_response: {
				status: 201,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			id: orderId,
			status: 'processed',
			status_detail: 'partially_refunded',
			transactions: {
				refunds: [
					{
						id: 'ref_01JE6T3H34FJBXF8K70RAMFYA1',
						transaction_id: 'pay_01JE6T2CWF7FDDD08HJS8DTAXR',
						reference_id: '01JE6T3GB9RHDXXXAQX41864R6',
						amount: '25.00',
						status: 'processed',
					}
				]
			}
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);

		const result = await refund({ id: orderId, body: refundRequest, config });

		expect(spyFetch).toHaveBeenCalledWith(`/v1/orders/${orderId}/refund`,
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer access_token',
				},
				body: JSON.stringify(refundRequest),
			}
		);
		expect(result).toEqual(mockOrderResponse);
	});
});

describe('Public Order.refund split payloads', () => {
	test.each([
		{ variant: 'Split 1:N', body: { splits: [{ receiver_id: '550e8400-e29b-41d4-a716-446655440001', amount: '25.00' }] } },
		{ variant: 'Checkout Pro', body: { splits: [{ user_id: 12345, amount: '25.00' }] } }
	])('serializes the $variant refund body without changing it', async ({ body }) => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 201, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-SPLIT-REFUND',
			status: 'processed',
			status_detail: 'partially_refunded',
			transactions: { refunds: [{ id: 'REF-SPLIT', amount: '25.00', status: 'processed' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' }))
			.refund({ id: fixture.id, body });

		expect(RestClient.fetch).toHaveBeenCalledWith(`/v1/orders/${fixture.id}/refund`, expect.objectContaining({
			method: 'POST', body: JSON.stringify(body)
		}));
		expect(result.api_response.status).toBe(201);
		expect(result.status_detail).toBe('partially_refunded');
		expect(result.transactions.refunds[0].amount).toBe('25.00');
	});

	test('preserves bodyless and transaction refund requests', async () => {
		const { Order } = await import('..');
		const client = new Order(new MercadoPagoConfig({ accessToken: 'access_token' }));
		(RestClient.fetch as jest.Mock).mockResolvedValue({ api_response: { status: 201, headers: [] } });
		await client.refund({ id: 'ORD-REFUND' });
		expect(RestClient.fetch).toHaveBeenLastCalledWith('/v1/orders/ORD-REFUND/refund',
			expect.objectContaining({ method: 'POST', body: undefined }));

		const body: RefundRequest = { transactions: [{ id: 'PAY-REFUND', amount: '10.00' }] };
		await client.refund({ id: 'ORD-REFUND', body });
		expect(RestClient.fetch).toHaveBeenLastCalledWith('/v1/orders/ORD-REFUND/refund',
			expect.objectContaining({ method: 'POST', body: JSON.stringify(body) }));
	});
});

describe('Public Order.refund request variants and options', () => {
	test('sends independent bodyless, transaction, and split requests with merged options', async () => {
		const { Order } = await import('..');
		const config = new MercadoPagoConfig({
			accessToken: 'access_token',
			options: { timeout: 5000 }
		});
		const client = new Order(config);
		const response: OrderResponse = {
			api_response: { status: 201, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-REFUND-VARIANTS',
			status: 'processed',
			status_detail: 'partially_refunded',
			transactions: { refunds: [{ id: 'REF-001', amount: '10.00', status: 'processed' }] }
		};
		const fetchMock = RestClient.fetch as jest.Mock;
		fetchMock.mockResolvedValue(response);

		const transactions: RefundRequest = { transactions: [{ id: 'PAY-001', amount: '10.00' }] };
		const receivers: RefundRequest = {
			splits: [{ receiver_id: '550e8400-e29b-41d4-a716-446655440001', amount: '25.00' }]
		};
		const users: RefundRequest = { splits: [{ user_id: 12345, amount: '15.00' }] };
		const route = '/v1/orders/ORD-REFUND-VARIANTS/refund';
		const options = { timeout: 2500 };
		const firstCall = fetchMock.mock.calls.length;

		const full: OrderResponse = await client.refund({ id: response.id, requestOptions: options });
		const partial: OrderResponse = await client.refund({ id: response.id, body: transactions });
		const receiverSplit: OrderResponse = await client.refund({ id: response.id, body: receivers });
		const userSplit: OrderResponse = await client.refund({ id: response.id, body: users });

		const baseRequest = { method: 'POST', headers: { Authorization: 'Bearer access_token' } };
		expect(fetchMock.mock.calls.slice(firstCall)).toEqual([
			[route, { ...baseRequest, body: undefined, timeout: 2500 }],
			[route, { ...baseRequest, body: JSON.stringify(transactions), timeout: 2500 }],
			[route, { ...baseRequest, body: JSON.stringify(receivers), timeout: 2500 }],
			[route, { ...baseRequest, body: JSON.stringify(users), timeout: 2500 }]
		]);
		expect(JSON.parse(fetchMock.mock.calls[firstCall + 2][1].body)).toEqual({
			splits: [{ receiver_id: '550e8400-e29b-41d4-a716-446655440001', amount: '25.00' }]
		});
		expect(JSON.parse(fetchMock.mock.calls[firstCall + 3][1].body)).toEqual({
			splits: [{ user_id: 12345, amount: '15.00' }]
		});
		for (const result of [full, partial, receiverSplit, userSplit]) {
			expect(result.api_response.status).toBe(201);
			expect(result.transactions.refunds[0].amount).toBe('10.00');
		}
	});
});
