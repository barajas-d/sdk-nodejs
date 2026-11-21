import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Order } from '../index';
import type { OrderEventsRequest, OrderEventsResponse } from './types';

jest.mock('@utils/restClient');

const orderId = '01HZX9T6V4W4V2ZKX1N7R3B6QF';
const noContent: OrderEventsResponse = {
	api_response: { status: 204, headers: [] }
};

beforeEach(() => {
	jest.resetAllMocks();
	(RestClient.fetch as jest.Mock).mockResolvedValue(noContent);
});

describe('Order.events Point status simulation', () => {
	test('the public facade sends the supplied JSON body, authentication, and merged options, returning 204 metadata without a JSON response body', async () => {
		const config = new MercadoPagoConfig({
			accessToken: 'test_access_token',
			options: { timeout: 5000 }
		});
		const order = new Order(config);
		const body: OrderEventsRequest = {
			status: 'processed',
			status_detail: 'accredited',
			payment_method_type: 'credit_card',
			payment_method_id: 'visa',
			installments: 3
		};

		const response: OrderEventsResponse = await order.events({
			id: orderId,
			body,
			requestOptions: { idempotencyKey: 'event-request-key' }
		});

		expect(RestClient.fetch).toHaveBeenCalledTimes(1);
		expect(RestClient.fetch).toHaveBeenCalledWith(`/v1/orders/${orderId}/events`, {
			method: 'POST',
			headers: { Authorization: 'Bearer test_access_token' },
			body: JSON.stringify(body),
			timeout: 5000,
			idempotencyKey: 'event-request-key'
		});
		expect(response).toEqual(noContent);
		expect(response.api_response.status).toBe(204);
	});

	test.each([
		{ status: 'processed' },
		{ status: 'canceled' },
		{ status: 'expired' },
		{ status: 'failed' },
		{ status: 'refunded' },
		{ status: 'action_required' }
	] as OrderEventsRequest[])('accepts the supported Point status $status without assuming remote order state', async (body) => {
		const order = new Order(new MercadoPagoConfig({ accessToken: 'test_access_token' }));

		const response = await order.events({ id: orderId, body });

		expect(RestClient.fetch).toHaveBeenCalledWith(`/v1/orders/${orderId}/events`, {
			method: 'POST',
			headers: { Authorization: 'Bearer test_access_token' },
			body: JSON.stringify(body)
		});
		expect(response).toEqual(noContent);
	});

	test.each([
		{ status: 'processed', status_detail: 'accredited', payment_method_id: 'master' },
		{ status: 'failed', status_detail: 'high_risk', payment_method_type: 'debit_card', payment_method_id: 'debvisa' },
		{ status: 'failed', status_detail: 'processing_error' }
	] as OrderEventsRequest[])('serializes supported conditional detail and method ID: %p', async (body) => {
		const order = new Order(new MercadoPagoConfig({ accessToken: 'test_access_token' }));

		await order.events({ id: orderId, body });

		expect(RestClient.fetch).toHaveBeenCalledWith(`/v1/orders/${orderId}/events`,
			expect.objectContaining({ body: JSON.stringify(body) }));
	});

	test.each([
		{ status: 'canceled', payment_method_id: 'visa' },
		{ status: 'action_required', status_detail: 'accredited' },
		{ status: 'processed', status_detail: 'high_risk' },
		{ status: 'failed', status_detail: 'accredited' },
		{ status: 'failed', status_detail: 'unknown_detail' },
		{ status: 'unknown_status' }
	])('rejects unsupported status or conditional field combinations: %p', (invalidBody) => {
		const order = new Order(new MercadoPagoConfig({ accessToken: 'test_access_token' }));

		expect(() => order.events({ id: orderId, body: invalidBody as unknown as OrderEventsRequest }))
			.toThrow(RangeError);
		expect(RestClient.fetch).not.toHaveBeenCalled();
	});

	test('accepts positive integer installments with credit_card and sends them in the body', async () => {
		const order = new Order(new MercadoPagoConfig({ accessToken: 'test_access_token' }));
		const body: OrderEventsRequest = { status: 'processed', payment_method_type: 'credit_card', installments: 2 };

		await order.events({ id: orderId, body });

		expect(RestClient.fetch).toHaveBeenCalledWith(`/v1/orders/${orderId}/events`,
			expect.objectContaining({ body: JSON.stringify(body) }));
	});

	test.each([
		{ status: 'processed', payment_method_type: 'credit_card', installments: 0 },
		{ status: 'processed', payment_method_type: 'credit_card', installments: -1 },
		{ status: 'processed', payment_method_type: 'credit_card', installments: 1.5 },
		{ status: 'processed', payment_method_type: 'debit_card', installments: 2 },
		{ status: 'processed', installments: 2 }
	])('rejects nonpositive/noninteger installments or installments without credit_card: %p', (invalidBody) => {
		const order = new Order(new MercadoPagoConfig({ accessToken: 'test_access_token' }));

		expect(() => order.events({ id: orderId, body: invalidBody as unknown as OrderEventsRequest }))
			.toThrow(RangeError);
		expect(RestClient.fetch).not.toHaveBeenCalled();
	});
});
