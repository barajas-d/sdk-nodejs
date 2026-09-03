import { Order } from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Order client', () => {
	let mercadoPagoConfig: MercadoPagoConfig;
	let order: Order;

	beforeEach(() => {
		mercadoPagoConfig = new MercadoPagoConfig({ accessToken: 'test-access-token' });
		order = new Order(mercadoPagoConfig);
	});

	test('should create an Order instance', () => {
		expect(order).toBeInstanceOf(Order);
	});

	test('should inherit from MPBase', () => {
		expect(order).toHaveProperty('config');
	});

	test('should store the configuration', () => {
		expect(order['config']).toBe(mercadoPagoConfig);
	});
});