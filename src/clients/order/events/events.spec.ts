import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Order } from '..';
import type { OrderEventsRequest, OrderEventsResponse } from './types';

describe('Public Order.events with the real RestClient', () => {
	let originalFetch: typeof globalThis.fetch;
	let fetchMock: jest.Mock;

	beforeEach(() => {
		originalFetch = globalThis.fetch;
		fetchMock = jest.fn().mockResolvedValue(new Response(null, { status: 204 }));
		globalThis.fetch = fetchMock;
	});

	afterEach(() => {
		globalThis.fetch = originalFetch;
		jest.clearAllMocks();
	});

	test('POSTs the serialized Point simulation body with merged options and returns SDK HTTP metadata', async () => {
		const config = new MercadoPagoConfig({
			accessToken: 'point-test-token',
			options: { timeout: 5000 }
		});
		const body: OrderEventsRequest = {
			status: 'processed',
			status_detail: 'accredited',
			payment_method_id: 'visa',
			payment_method_type: 'credit_card',
			installments: 3
		};
		const result: OrderEventsResponse = await new Order(config).events({
			id: '01HZX9T6V4W4V2ZKX1N7R3B6QF',
			body,
			requestOptions: { timeout: 1500, idempotencyKey: 'point-event-key' }
		});
		expect(result.api_response.status).toBe(204);

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock).toHaveBeenCalledWith(
		expect.stringContaining('/v1/orders/01HZX9T6V4W4V2ZKX1N7R3B6QF/events'),
		expect.objectContaining({
			method: 'POST',
			body: JSON.stringify(body),
			signal: expect.any(AbortSignal),
			headers: expect.objectContaining({
				Authorization: 'Bearer point-test-token',
				'Content-Type': expect.stringContaining('application/json'),
				'X-Idempotency-Key': 'point-event-key'
			})
		})
		);
		expect(result.api_response.status).toBe(204);
		expect(result).toEqual({ api_response: { status: 204, headers: {} } });
		expect(config.options).toEqual(expect.objectContaining({
			timeout: 1500,
			idempotencyKey: 'point-event-key'
		}));
	});

	test.each([0, -1, 1.5])('rejects invalid credit card installments (%s) before fetch', (installments) => {
		const body: OrderEventsRequest = {
			status: 'processed', payment_method_type: 'credit_card', installments
		};
		expect(() => new Order(new MercadoPagoConfig({ accessToken: 'point-test-token' })).events({
			id: '01HZX9T6V4W4V2ZKX1N7R3B6QF', body
		})).toThrow('Installments must be a positive integer for credit_card payments');
		expect(fetchMock).not.toHaveBeenCalled();
	});

	test.each(['debit_card', 'qr', 'voucher_card'] as const)(
		'rejects installments for %s before fetch', (payment_method_type) => {
			const body: OrderEventsRequest = { status: 'failed', payment_method_type };
			Object.defineProperty(body, 'installments', { value: 2, enumerable: true });
			expect(() => new Order(new MercadoPagoConfig({ accessToken: 'point-test-token' })).events({
				id: '01HZX9T6V4W4V2ZKX1N7R3B6QF', body
			})).toThrow('Installments must be a positive integer for credit_card payments');
			expect(fetchMock).not.toHaveBeenCalled();
		}
	);
});
