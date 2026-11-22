import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import get from './index';
import { OrderResponse } from '../commonTypes';

jest.mock('@utils/restClient');

describe('Get Order', () => {
	test('should get Order', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = '01JDMS5325ZDWMESRB5G2541BD';
		const mockOrderResponse: OrderResponse = {
			api_response: {
				status: 200,
				headers: [
					'Content-Type', ['application/json']
				]
			},
			id: orderId,
			status: '200',
			total_amount: '200.00',
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);
		
		const result = await get({ id: orderId, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders/01JDMS5325ZDWMESRB5G2541BD',
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer access_token',
				}
			}
		);
		expect(result).toEqual(mockOrderResponse);
	});

	test('should return Checkout PRO response fields', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const orderId = 'ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9';
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
			status: 'created',
			checkout_url: 'https://www.mercadopago.com/checkout/v1/redirect?order_id=ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9',
			client_token: 'eyJhbGciOiJSUzI1NiIs...',
			config: {
				online: {
					auto_return: 'approved',
					retries: {
						allowed: false,
					},
				},
				payment_method: {
					max_installments: 12,
					installments: {
						interest_free: {
							type: 'range',
							values: [2, 6],
						},
					},
				},
			},
		};
		jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockOrderResponse);

		const result = await get({ id: orderId, config });

		expect(result.checkout_url).toBe(mockOrderResponse.checkout_url);
		expect(result.client_token).toBe(mockOrderResponse.client_token);
		expect(result.config.online.retries.allowed).toBe(false);
		expect(result.config.payment_method.installments.interest_free.type).toBe('range');
		expect(result.config.payment_method.installments.interest_free.values).toEqual([2, 6]);
	});
});

describe('Get Order successful responses', () => {
	test('returns the Checkout API order with a typed payment and HTTP metadata', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-CHECKOUT-GET',
			status: 'processed',
			transactions: { payments: [{ id: 'PAY-CHECKOUT', amount: '100.00', status: 'processed', payment_method: { id: 'pix', qr_code: '000201' } }] },
			shipment: { mode: 'custom', address: { zip_code: '01310-100', floor: '3' } }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await get({ id: fixture.id, config });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-CHECKOUT-GET', expect.objectContaining({ method: 'GET' }));
		expect(result.api_response.status).toBe(200);
		expect(result.api_response.headers).toEqual(['Content-Type', ['application/json']]);
		expect(result.status).toBe('processed');
		expect(result.transactions.payments[0].payment_method.qr_code).toBe('000201');
		expect(result.shipment.address.floor).toBe('3');
	});

	test('returns a Point order with a typed payment and terminal configuration', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-POINT-GET', type: 'point', status: 'processed',
			config: { point: { terminal_id: 'TERM-001' } },
			transactions: { payments: [{ id: 'PAY-POINT', paid_amount: '14.00', status: 'processed' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await get({ id: fixture.id, config });

		expect(result.api_response.status).toBe(200);
		expect(result.status).toBe('processed');
		expect(result.config.point.terminal_id).toBe('TERM-001');
		expect(result.transactions.payments[0].paid_amount).toBe('14.00');
	});
});

describe('Public Order.get successful responses', () => {
	test('returns Checkout PRO payment and online checkout data through the public method', async () => {
		const { Order } = await import('..');
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-PRO-GET', type: 'online', status: 'created',
			checkout_url: 'https://www.mercadopago.com/checkout/v1/redirect?order_id=ORD-PRO-GET',
			transactions: { payments: [{ id: 'PAY-PRO', status: 'pending', amount: '50.00', payment_method: { id: 'visa', type: 'credit_card' } }] },
			config: { online: { auto_return: 'approved', retries: { allowed: false } } }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(config).get({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-PRO-GET', expect.objectContaining({ method: 'GET' }));
		expect(result.api_response).toEqual({ status: 200, headers: ['Content-Type', ['application/json']] });
		expect(result.status).toBe('created');
		expect(result.transactions.payments[0].payment_method.type).toBe('credit_card');
		expect(result.config.online.retries.allowed).toBe(false);
	});

	test('returns a Point payment and terminal configuration through the public method', async () => {
		const { Order } = await import('..');
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-POINT-PUBLIC', type: 'point', status: 'processed',
			config: { point: { terminal_id: 'TERM-001' } },
			transactions: { payments: [{ id: 'PAY-POINT-PUBLIC', amount: '14.00', status: 'processed' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(config).get({ id: fixture.id });

		expect(result.api_response.status).toBe(200);
		expect(result.api_response.headers).toEqual(['Content-Type', ['application/json']]);
		expect(result.status).toBe('processed');
		expect(result.config.point.terminal_id).toBe('TERM-001');
		expect(result.transactions.payments[0].amount).toBe('14.00');
	});

	test('returns the shared Checkout API Split 1:N order shape through the public method', async () => {
		const { Order } = await import('..');
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-SPLIT-GET', type: 'online', status: 'processed',
			transactions: { payments: [{ id: 'PAY-SPLIT', amount: '100.00', status: 'processed' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(config).get({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-SPLIT-GET', expect.objectContaining({ method: 'GET' }));
		expect(result.api_response.status).toBe(200);
		expect(result.api_response.headers).toEqual(['Content-Type', ['application/json']]);
		expect(result.status).toBe('processed');
		expect(result.transactions.payments[0].status).toBe('processed');
	});

	test('returns Checkout PRO payment confirmation fields through the public method', async () => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-PRO-CONFIRMED', type: 'online', status: 'processed',
			transactions: { payments: [{ id: 'PAY-PRO-CONFIRMED', status: 'processed', amount: '50.00', confirmed_amount: '50.00', authorization_code: '123456', payment_method: { id: 'visa', type: 'credit_card' } }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).get({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-PRO-CONFIRMED', expect.objectContaining({ method: 'GET' }));
		expect(result.api_response).toEqual(fixture.api_response);
		expect(result.status).toBe('processed');
		expect(result.transactions.payments[0].confirmed_amount).toBe('50.00');
		expect(result.transactions.payments[0].authorization_code).toBe('123456');
	});

	test('returns Point payment tip and card through the public method', async () => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-POINT-CARD', type: 'point', status: 'processed',
			config: { point: { terminal_id: 'TERM-001' } },
			transactions: { payments: [{ id: 'PAY-POINT-CARD', status: 'processed', amount: '14.00', tip_amount: '2.00', card: { first_six_digits: '450995', last_four_digits: '3704', cardholder: { name: 'Buyer' } } }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).get({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-POINT-CARD', expect.objectContaining({ method: 'GET' }));
		expect(result.api_response).toEqual(fixture.api_response);
		expect(result.status).toBe('processed');
		expect(result.transactions.payments[0].tip_amount).toBe('2.00');
		expect(result.transactions.payments[0].card.last_four_digits).toBe('3704');
		expect(result.transactions.payments[0].card.cardholder.name).toBe('Buyer');
	});

	test('returns QR CA cash-outs through the public method', async () => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-QR-CA-GET', type: 'qr', status: 'processed',
			transactions: { payments: [{ id: 'PAY-QR-CA', status: 'processed' }], cash_outs: [{ id: 'CASH-QR-CA', amount: '25.00', status: 'processed' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).get({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-QR-CA-GET', expect.objectContaining({ method: 'GET' }));
		expect(result.api_response).toEqual(fixture.api_response);
		expect(result.status).toBe('processed');
		expect(result.transactions.cash_outs[0].id).toBe('CASH-QR-CA');
		expect(result.transactions.cash_outs[0].amount).toBe('25.00');
		expect(result.transactions.cash_outs[0].status).toBe('processed');
		expect(result.transactions.payments[0].id).toBe('PAY-QR-CA');
	});

	test('returns QR configuration and payment through the public method', async () => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-QR-CONFIG-GET', type: 'qr', status: 'processed',
			config: { qr: { external_pos_id: 'POS-001' } },
			transactions: { payments: [{ id: 'PAY-QR-CONFIG', status: 'processed' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).get({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-QR-CONFIG-GET', expect.objectContaining({ method: 'GET' }));
		expect(result.api_response).toEqual(fixture.api_response);
		expect(result.status).toBe('processed');
		expect(result.config.qr.external_pos_id).toBe('POS-001');
		expect(result.transactions.payments[0].id).toBe('PAY-QR-CONFIG');
	});

	test('returns a QR CA payment, cash-out and POS configuration together through the public method', async () => {
		const { Order } = await import('..');
		const fixture: OrderResponse = {
			api_response: { status: 200, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-QR-CA-POS-GET', type: 'qr', status: 'processed',
			config: { qr: { external_pos_id: 'POS-CA' } },
			transactions: {
				payments: [{ id: 'PAY-QR-CA-POS', status: 'processed' }],
				cash_outs: [{ id: 'CASH-QR-CA-POS', amount: '25.00', status: 'processed' }]
			}
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).get({ id: fixture.id });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders/ORD-QR-CA-POS-GET', expect.objectContaining({ method: 'GET' }));
		expect(result.api_response).toEqual(fixture.api_response);
		expect(result.status).toBe('processed');
		expect(result.config.qr.external_pos_id).toBe('POS-CA');
		expect(result.transactions.payments[0].id).toBe('PAY-QR-CA-POS');
		expect(result.transactions.cash_outs[0].amount).toBe('25.00');
		expect(result.transactions.payments[0].status).toBe('processed');
		expect(result.transactions.cash_outs[0].status).toBe('processed');
		expect(result.api_response.status).toBe(200);
		expect(result.api_response.headers).toEqual(['Content-Type', ['application/json']]);
	});
});
