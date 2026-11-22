import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Order } from '..';

import type { OrderCreateClient, CreateOrderRequest } from './types';
import create from '.';
import { createEmailTestUser } from '@src/mocks/createEmailTestUser';

jest.mock('@utils/restClient');

describe('Create Order', () => {
	test('should create Order', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			total_amount: '1000.00',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '1000.00',
						payment_method: {
							id: 'master',
							type: 'credit_card',
							token: 'card_token',
							installments: 1,
						},
					},
				],
			},
			payer: {
				email: createEmailTestUser(),
			},
		};
		const mockCreate: OrderCreateClient = {
			body: mockBody,
			config
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch');

		await create(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			{
				body: JSON.stringify(mockBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'POST',
				timeout: 5000
			}
		);
	});
});



describe('Create Order', () => {
	test('should support payment_method.id = "boleto" in request and response', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			total_amount: '1000.00',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '1000.00',
						payment_method: {
							id: 'boleto',
							type: 'ticket',
						},
					},
				],
			},
			payer: {
				email: createEmailTestUser(),
			},
			additional_info: {
				payer: {
					authentication_type: 'senha',
				}
			}
		};
		const mockCreate: OrderCreateClient = {
			body: mockBody,
			config
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch');

		(RestClient.fetch as jest.Mock).mockResolvedValue({
			transactions: {
				payments: [
					{
						payment_method: {
							id: 'boleto',
							type: 'ticket'
						}
					}
				]
			},
			status: 'processed'
		});

		const response = await create(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			{
				body: JSON.stringify(mockBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'POST',
				timeout: 5000
			}
		);

		expect(response.transactions.payments[0].payment_method.id).toBe('boleto');
	});
});

describe('Create Order', () => {
	test('should support capture_mode = "automatic_async" in request and response', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			total_amount: '1000.00',
			capture_mode: 'automatic_async',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '1000.00',
						payment_method: {
							id: 'master',
							type: 'credit_card',
							token: 'card_token',
							installments: 1
						},
					},
				],
			},
			payer: {
				email: createEmailTestUser(),
			},
			additional_info: {
				payer: {
					authentication_type: 'senha',
				}
			}
		};

		const mockCreate: OrderCreateClient = {
			body: mockBody,
			config
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch');

		(RestClient.fetch as jest.Mock).mockResolvedValue({
			capture_mode: 'automatic_async',
			status: 'processed'
		});

		const response = await create(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/orders',
			{
				body: JSON.stringify(mockBody),
				headers: {
					Authorization: 'Bearer access_token'
				},
				method: 'POST',
				timeout: 5000
			}
		);

		expect(response.capture_mode).toBe('automatic_async');
	});
});

describe('Create Order', () => {
	test('should support additional_info.payer.authentication_type in request', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody = {
			type: 'online',
			total_amount: '1000.00',
			external_reference: 'ext_ref_1234',
			transactions: {
				payments: [
					{
						amount: '1000.00',
						payment_method: {
							id: 'master',
							type: 'credit_card',
							token: 'card_token',
							installments: 1
						}
					}
				]
			},
			payer: {
				email: createEmailTestUser(),
			},
			additional_info: {
				payer: {
					authentication_type: 'senha',
				}
			}
		};

		const mockCreate = {
			body: mockBody,
			config
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		(RestClient.fetch as jest.Mock).mockResolvedValue({ status: 'processed' });

		await create(mockCreate);

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({ body: expect.stringContaining('"authentication_type":"senha"')
			})
		);
	});
});

describe('Create Order — Checkout PRO', () => {
	test('should create a Checkout PRO order with type="online" and processing_mode="manual"', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			processing_mode: 'manual',
			capture_mode: 'automatic',
			total_amount: '500.00',
			external_reference: 'ORDER-1234',
			description: 'Travel package SAO-RIO',
			expiration_time: 'P1D',
			payer: {
				email: createEmailTestUser(),
				first_name: 'John',
				last_name: 'Smith',
			},
			config: {
				statement_descriptor: 'MYSTORE',
				online: {
					success_url: 'https://example.com/success',
					failure_url: 'https://example.com/failure',
					pending_url: 'https://example.com/pending',
					auto_return: 'approved',
				},
				payment_method: {
					max_installments: 12,
					not_allowed_ids: ['amex'],
					not_allowed_types: ['ticket'],
				},
			},
			items: [
				{
					title: 'Flight SAO-RIO',
					unit_price: '500.00',
					quantity: 1,
				}
			],
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch');
		(RestClient.fetch as jest.Mock).mockResolvedValue({
			id: 'ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9',
			type: 'online',
			processing_mode: 'manual',
			status: 'created',
			checkout_url: 'https://www.mercadopago.com/checkout/v1/redirect?order_id=ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9',
			client_token: 'eyJhbGciOiJSUzI1NiIs...',
			currency: 'BRL',
		});

		const response = await create({ body: mockBody, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders', {
			body: JSON.stringify(mockBody),
			headers: { Authorization: 'Bearer access_token' },
			method: 'POST',
			timeout: 5000,
		});

		expect(response.checkout_url).toBe('https://www.mercadopago.com/checkout/v1/redirect?order_id=ORDTST01KS5AJ6HTK2HRQ3XJ3C2JCKP9');
		expect(response.client_token).toBe('eyJhbGciOiJSUzI1NiIs...');
		expect(response.status).toBe('created');
		expect(response.processing_mode).toBe('manual');
	});
	test('should support config.online.tracks with google_ad and facebook_ad pixels', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			processing_mode: 'manual',
			total_amount: '100.00',
			payer: { email: createEmailTestUser() },
			config: {
				online: {
					success_url: 'https://example.com/success',
					tracks: [
						{
							type: 'google_ad',
							values: { conversion_id: '111', conversion_label: 'LABEL' }
						},
						{
							type: 'facebook_ad',
							values: { pixel_id: '222' }
						}
					]
				}
			}
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch');
		(RestClient.fetch as jest.Mock).mockResolvedValue({ status: 'created' });

		await create({ body: mockBody, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({
				body: expect.stringContaining('"conversion_id":"111"')
			})
		);
		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({
				body: expect.stringContaining('"pixel_id":"222"')
			})
		);
	});
	test('should support config.payment_method.installments.interest_free with range type', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			processing_mode: 'manual',
			total_amount: '500.00',
			payer: { email: createEmailTestUser() },
			config: {
				payment_method: {
					max_installments: 12,
					installments: {
						interest_free: {
							type: 'range',
							values: [2, 6]
						}
					}
				}
			}
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch');
		(RestClient.fetch as jest.Mock).mockResolvedValue({
			status: 'created',
			config: {
				payment_method: {
					max_installments: 12,
					installments: { interest_free: { type: 'range', values: [2, 6] } }
				}
			}
		});

		const response = await create({ body: mockBody, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({
				body: expect.stringContaining('"interest_free"')
			})
		);
		expect(response.config.payment_method.installments.interest_free.type).toBe('range');
		expect(response.config.payment_method.installments.interest_free.values).toEqual([2, 6]);
	});
	test('should support shipment with mode, cost, and full address including floor and apartment', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const mockBody: CreateOrderRequest = {
			type: 'online',
			processing_mode: 'manual',
			total_amount: '515.00',
			payer: { email: createEmailTestUser() },
			shipment: {
				mode: 'custom',
				local_pickup: false,
				cost: '15.00',
				free_shipping: false,
				free_methods: [{ id: 73328 }],
				address: {
					zip_code: '01310-100',
					street_name: 'Av. Paulista',
					street_number: '1000',
					floor: '3',
					apartment: 'B',
					neighborhood: 'Bela Vista',
					city: 'São Paulo',
				}
			}
		};

		const spyFetch = jest.spyOn(RestClient, 'fetch');
		(RestClient.fetch as jest.Mock).mockResolvedValue({ status: 'created' });

		await create({ body: mockBody, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({
				body: expect.stringContaining('"floor":"3"')
			})
		);
		expect(spyFetch).toHaveBeenCalledWith('/v1/orders',
			expect.objectContaining({
				body: expect.stringContaining('"apartment":"B"')
			})
		);
	});
});

describe('Create Order successful responses', () => {
	test('returns the Checkout API shipment and the 201 response envelope', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token' });
		const body: CreateOrderRequest = { type: 'online', total_amount: '100.00' };
		const fixture: import('../commonTypes').OrderResponse = {
			api_response: { status: 201, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-CHECKOUT',
			status: 'created',
			shipment: {
				mode: 'custom', cost: '10.00',
				address: { zip_code: '01310-100', floor: '3', apartment: 'B' }
			}
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: import('../commonTypes').OrderResponse = await new Order(config).create({ body });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders', expect.objectContaining({
			method: 'POST', body: JSON.stringify(body)
		}));
		expect(result.api_response.status).toBe(201);
		expect(result.api_response.headers).toEqual(['Content-Type', ['application/json']]);
		expect(result.status).toBe('created');
		expect(result.shipment.address.floor).toBe('3');
		expect(result.shipment.address.apartment).toBe('B');
	});
});

describe('Public Order.create variant request contracts', () => {
	const http = { status: 201, headers: ['Content-Type', ['application/json']] };

	test('Checkout API sends location, callback and 3DS settings with merged options', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const body: CreateOrderRequest = {
			type: 'online', total_amount: '100.00',
			config: {
				location: { state_id: 'BR-SP' },
				online: {
					callback_url: 'https://example.com/callback',
					transaction_security: { validation: 'always', liability_shift: 'required' }
				}
			},
			transactions: { payments: [{ amount: '100.00', payment_method: {
				id: 'visa', type: 'credit_card', token: 'card_token',
				transaction_security: { validation: 'on_fraud_risk', liability_shift: 'preferred' }
			} }] }
		};
		const fixture: import('../commonTypes').OrderResponse = {
			api_response: http, id: 'ORD-CHECKOUT', status: 'created',
			transactions: { payments: [{ id: 'PAY-CHECKOUT', amount: '100.00' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: import('../commonTypes').OrderResponse = await new Order(config).create({ body, requestOptions: { timeout: 7000 } });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders', {
			method: 'POST', headers: { Authorization: 'Bearer access_token' }, timeout: 7000,
			body: JSON.stringify(body)
		});
		expect(JSON.parse((RestClient.fetch as jest.Mock).mock.calls[0][1].body)).toEqual(body);
		expect(result.api_response).toEqual(http);
		expect(result.transactions.payments[0].id).toBe('PAY-CHECKOUT');
	});

	test('Split 1:N sends receiver allocations', async () => {
		const body: CreateOrderRequest = {
			type: 'online', total_amount: '500.00',
			config: { location: { state_id: 'BR-SP' } },
			splits: [
				{ receiver_id: 'OWNER_USER_ID', receiver_type: 'owner', amount: '250.00', description: 'Primary' },
				{ receiver_id: 'PARTNER_CONSENT_UUID', receiver_type: 'partner', amount: '250.00', description: 'Secondary' }
			],
			transactions: { payments: [{ amount: '500.00', payment_method: { id: 'visa', type: 'credit_card' } }] }
		};
		const fixture: import('../commonTypes').OrderResponse = {
			api_response: http, id: 'ORD-SPLIT', status: 'created',
			transactions: { payments: [{ id: 'PAY-SPLIT', amount: '500.00' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: import('../commonTypes').OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).create({ body });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders', {
			method: 'POST', headers: { Authorization: 'Bearer access_token' }, body: JSON.stringify(body)
		});
		expect(JSON.parse((RestClient.fetch as jest.Mock).mock.calls[0][1].body)).toEqual(body);
		expect(result.api_response.status).toBe(201);
		expect(result.transactions.payments[0].id).toBe('PAY-SPLIT');
	});

	test('Point sends terminal configuration', async () => {
		const body: CreateOrderRequest = {
			type: 'point', total_amount: '14.00', config: { point: { terminal_id: 'TERM-001' } },
			transactions: { payments: [{ amount: '14.00' }] }
		};
		const fixture: import('../commonTypes').OrderResponse = {
			api_response: http, id: 'ORD-POINT', type: 'point', status: 'created',
			config: { point: { terminal_id: 'TERM-001' } }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: import('../commonTypes').OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).create({ body });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders', {
			method: 'POST', headers: { Authorization: 'Bearer access_token' }, body: JSON.stringify(body)
		});
		expect(JSON.parse((RestClient.fetch as jest.Mock).mock.calls[0][1].body)).toEqual(body);
		expect(result.api_response.status).toBe(201);
		expect(result.config.point.terminal_id).toBe('TERM-001');
	});

	test('QR sends POS, tax and discount fields', async () => {
		const body: CreateOrderRequest = {
			type: 'qr', total_amount: '25.00', config: { qr: { external_pos_id: 'POS-001' } },
			taxes: [{ payer_condition: 'registered', type: 'IVA', value: '2.00' }],
			discounts: { payment_methods: [{ type: 'account_money', new_total_amount: '23.00' }] }
		};
		const fixture: import('../commonTypes').OrderResponse = {
			api_response: http, id: 'ORD-QR', type: 'qr', status: 'created',
			config: { qr: { external_pos_id: 'POS-001' } }, type_response: { qr_data: '000201' }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: import('../commonTypes').OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).create({ body });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders', {
			method: 'POST', headers: { Authorization: 'Bearer access_token' }, body: JSON.stringify(body)
		});
		expect(JSON.parse((RestClient.fetch as jest.Mock).mock.calls[0][1].body)).toEqual(body);
		expect(result.api_response.status).toBe(201);
		expect(result.type_response.qr_data).toBe('000201');
	});

	test('QR CA sends cash-out transactions separately from returned cash-outs', async () => {
		const body: CreateOrderRequest = {
			type: 'qr', total_amount: '25.00', config: { qr: { external_pos_id: 'POS-CA' } },
			transactions: { cash_outs: [{ amount: '25.00' }] }
		};
		const fixture: import('../commonTypes').OrderResponse = {
			api_response: http, id: 'ORD-QR-CA', type: 'qr', status: 'created',
			transactions: { cash_outs: [{ id: 'CASH-CA', amount: '25.00', status: 'created' }] }
		};
		(RestClient.fetch as jest.Mock).mockResolvedValue(fixture);

		const result: import('../commonTypes').OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).create({ body });

		expect(RestClient.fetch).toHaveBeenCalledWith('/v1/orders', {
			method: 'POST', headers: { Authorization: 'Bearer access_token' }, body: JSON.stringify(body)
		});
		expect(JSON.parse((RestClient.fetch as jest.Mock).mock.calls[0][1].body)).toEqual(body);
		expect(result.api_response.status).toBe(201);
		expect(result.transactions.cash_outs[0].id).toBe('CASH-CA');
	});
});

describe('Public Order.create serialized variant fixtures', () => {
	test('Checkout API serializes location, callback URL and online 3DS independently of the response', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000 } });
		const body: CreateOrderRequest = {
			type: 'online', total_amount: '100.00',
			config: {
				location: { state_id: 'BR-SP' },
				online: {
					callback_url: 'https://merchant.com/pse/return',
					transaction_security: { validation: 'on_fraud_risk', liability_shift: 'required' }
				}
			},
			transactions: { payments: [{ amount: '100.00', payment_method: { id: 'visa', type: 'credit_card' } }] }
		};
		const fixture: import('../commonTypes').OrderResponse = {
			api_response: { status: 201, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-CHECKOUT-3DS', status: 'created'
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(fixture);

		const result: import('../commonTypes').OrderResponse = await new Order(config).create({ body, requestOptions: { timeout: 7000 } });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders', {
			method: 'POST', headers: { Authorization: 'Bearer access_token' }, timeout: 7000,
			body: JSON.stringify({
				type: 'online', total_amount: '100.00',
				config: {
					location: { state_id: 'BR-SP' },
					online: {
						callback_url: 'https://merchant.com/pse/return',
						transaction_security: { validation: 'on_fraud_risk', liability_shift: 'required' }
					}
				},
				transactions: { payments: [{ amount: '100.00', payment_method: { id: 'visa', type: 'credit_card' } }] }
			})
		});
		expect(result.id).toBe('ORD-CHECKOUT-3DS');
		expect(result.api_response.status).toBe(201);
	});

	test('Split 1:N serializes receiver allocations through the public method', async () => {
		const body: CreateOrderRequest = {
			type: 'online', total_amount: '500.00',
			splits: [
				{ receiver_id: 'OWNER_USER_ID', receiver_type: 'owner', amount: '250.00', description: 'Primary' },
				{ receiver_id: 'PARTNER_CONSENT_UUID', receiver_type: 'partner', amount: '250.00', description: 'Secondary' }
			]
		};
		const fixture: import('../commonTypes').OrderResponse = {
			api_response: { status: 201, headers: ['Content-Type', ['application/json']] },
			id: 'ORD-SPLIT-FIXTURE', status: 'created'
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(fixture);

		const result: import('../commonTypes').OrderResponse = await new Order(new MercadoPagoConfig({ accessToken: 'access_token' })).create({ body });

		expect(spyFetch).toHaveBeenCalledWith('/v1/orders', {
			method: 'POST', headers: { Authorization: 'Bearer access_token' },
			body: JSON.stringify({
				type: 'online', total_amount: '500.00',
				splits: [
					{ receiver_id: 'OWNER_USER_ID', receiver_type: 'owner', amount: '250.00', description: 'Primary' },
					{ receiver_id: 'PARTNER_CONSENT_UUID', receiver_type: 'partner', amount: '250.00', description: 'Secondary' }
				]
			})
		});
		expect(result.id).toBe('ORD-SPLIT-FIXTURE');
		expect(result.api_response.status).toBe(201);
	});
});
