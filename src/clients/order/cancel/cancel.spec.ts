import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import cancel from './index';
import { OrderResponse } from '../commonTypes';

jest.mock('@utils/restClient');

describe('Cancel Order', () => {
	test('should cancel an Order', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JE48XZBYRK6W22V7DFQRABEV';
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
			status: 'canceled',
			status_detail: 'canceled',
			total_amount: '200.00',
			transactions: {
				payments: [
					{
						status: 'canceled',
						status_detail: 'canceled_transaction'
					}
				]
			}
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);

		const result = await cancel({ id: orderId, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JE48XZBYRK6W22V7DFQRABEV/cancel',
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

describe('Public Order.cancel successful responses', () => {
	test.each([
		{ variant: 'Checkout API', id: 'ORD-CHECKOUT-CANCEL', payment: { id: 'PAY-CHECKOUT', status: 'canceled', payment_method: { id: 'pix', qr_code: '000201' } }, config: undefined },
		{ variant: 'Checkout API Split 1:N', id: 'ORD-SPLIT-CANCEL', payment: { id: 'PAY-SPLIT', status: 'canceled', amount: '100.00' }, config: undefined },
		{ variant: 'Checkout PRO', id: 'ORD-PRO-CANCEL', payment: { id: 'PAY-PRO', status: 'canceled', payment_method: { id: 'visa', type: 'credit_card' } }, config: { online: { auto_return: 'approved' as const } } },
		{ variant: 'Point', id: 'ORD-POINT-CANCEL', payment: { id: 'PAY-POINT', status: 'canceled', amount: '14.00' }, config: { point: { terminal_id: 'TERM-001' } } },
		{ variant: 'QR', id: 'ORD-QR-CANCEL', payment: { id: 'PAY-QR', status: 'canceled' }, config: { qr: { external_pos_id: 'POS-001' } } }
	])('returns a typed $variant order and HTTP metadata', async ({ id, payment, config }) => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id,
			status: 'canceled',
			transactions: { payments: [payment] },
			config
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).cancel({ id });

		expect(RestClient.fetch).toHaveBeenCalledWith(`/v1/orders/${id}/cancel`, expect.objectContaining({ method: 'POST' }));
		expect(result.api_response).toEqual({ status: 200, headers: ['Content-Type', ['application/json']] });
		expect(result.status).toBe('canceled');
		expect(result.transactions.payments[0]).toEqual(payment);
		expect(result.config).toEqual(config);
	});

	test('returns QR CA cash-outs and payments through the public method', async () => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-QR-CA-CANCEL', type: 'qr', status: 'canceled',
			transactions: {
				payments: [{ id: 'PAY-QR-CA-CANCEL', status: 'canceled' }],
				cash_outs: [{ id: 'CASH-QR-CA-CANCEL', amount: '25.00', status: 'canceled' }]
			}
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).cancel({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-QR-CA-CANCEL/cancel', expect.objectContaining({ method: 'POST' }));
		expect(result.api_response).toEqual({ status: 200, headers: ['Content-Type', ['application/json']] });
		expect(result.status).toBe('canceled');
		expect(result.id).toBe('ORD-QR-CA-CANCEL');
		expect(result.transactions.cash_outs[0].id).toBe('CASH-QR-CA-CANCEL');
		expect(result.transactions.cash_outs[0].amount).toBe('25.00');
		expect(result.transactions.cash_outs[0].status).toBe('canceled');
		expect(result.transactions.cash_outs).toEqual([{ id: 'CASH-QR-CA-CANCEL', amount: '25.00', status: 'canceled' }]);
		expect(result.transactions.payments[0].id).toBe('PAY-QR-CA-CANCEL');
	});
});

describe('Public Order.cancel variant payment details', () => {
	test('returns Checkout Pro confirmation details in the canceled order', async () => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-PRO-CONFIRM-CANCEL', type: 'online', status: 'canceled',
			transactions: { payments: [{ id: 'PAY-PRO-CONFIRM-CANCEL', status: 'canceled', confirmed_amount: '50.00', authorization_code: '123456' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).cancel({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-PRO-CONFIRM-CANCEL/cancel', expect.objectContaining({ method: 'POST' }));
		expect(result.api_response).toEqual(fixture.api_response);
		expect(result.status).toBe('canceled');
		expect(result.transactions.payments[0].confirmed_amount).toBe('50.00');
		expect(result.transactions.payments[0].authorization_code).toBe('123456');
	});

	test('returns Point tip and card in the canceled order', async () => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-POINT-CARD-CANCEL', type: 'point', status: 'canceled',
			config: { point: { terminal_id: 'TERM-001' } },
			transactions: { payments: [{ id: 'PAY-POINT-CARD-CANCEL', status: 'canceled', tip_amount: '2.00', card: { first_six_digits: '450995', last_four_digits: '3704', cardholder: { name: 'Buyer' } } }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).cancel({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-POINT-CARD-CANCEL/cancel', expect.objectContaining({ method: 'POST' }));
		expect(result.api_response).toEqual(fixture.api_response);
		expect(result.status).toBe('canceled');
		expect(result.config.point.terminal_id).toBe('TERM-001');
		expect(result.transactions.payments[0].tip_amount).toBe('2.00');
		expect(result.transactions.payments[0].card.last_four_digits).toBe('3704');
		expect(result.transactions.payments[0].card.cardholder.name).toBe('Buyer');
	});

	test('returns QR POS configuration and payment in the canceled order', async () => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-QR-POS-CANCEL', type: 'qr', status: 'canceled',
			config: { qr: { external_pos_id: 'POS-001' } },
			transactions: { payments: [{ id: 'PAY-QR-POS-CANCEL', status: 'canceled' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).cancel({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-QR-POS-CANCEL/cancel', expect.objectContaining({ method: 'POST' }));
		expect(result.api_response).toEqual(fixture.api_response);
		expect(result.status).toBe('canceled');
		expect(result.config.qr.external_pos_id).toBe('POS-001');
		expect(result.transactions.payments[0].id).toBe('PAY-QR-POS-CANCEL');
		expect(result.transactions.payments[0].status).toBe('canceled');
	});

	test('returns an accepted Point cancellation awaiting terminal confirmation', async () => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 202, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-POINT-ASYNC-CANCEL', type: 'point', status: 'at_terminal', status_detail: 'at_terminal',
			transactions: { payments: [{ id: 'PAY-POINT-ASYNC-CANCEL', status: 'at_terminal', status_detail: 'cancellation_requested' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).cancel({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-POINT-ASYNC-CANCEL/cancel', expect.objectContaining({ method: 'POST' }));
		expect(result.api_response.status).toBe(202);
		expect(result.api_response.headers).toEqual(['Content-Type', ['application/json']]);
		expect(result.status).toBe('at_terminal');
		expect(result.status_detail).toBe('at_terminal');
		expect(result.transactions.payments[0].status).toBe('at_terminal');
		expect(result.transactions.payments[0].status_detail).toBe('cancellation_requested');
		expect(result.transactions.payments).toEqual([{ id: 'PAY-POINT-ASYNC-CANCEL', status: 'at_terminal', status_detail: 'cancellation_requested' }]);
	});
});
