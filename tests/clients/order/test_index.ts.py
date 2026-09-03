import { Order } from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Order Client', () => {
	let config: MercadoPagoConfig;
	let order: Order;

	beforeEach(() => {
		config = new MercadoPagoConfig({ accessToken: 'test_token' });
		order = new Order(config);
	});

	describe('constructor', () => {
		test('should initialize Order client with MercadoPagoConfig', () => {
			expect(order).toBeInstanceOf(Order);
			expect(order['config']).toBe(config);
		});

		test('should store config reference correctly', () => {
			const newConfig = new MercadoPagoConfig({ accessToken: 'another_token' });
			const newOrder = new Order(newConfig);
			expect(newOrder['config']).toBe(newConfig);
		});
	});

	describe('client structure', () => {
		test('should be a class', () => {
			expect(typeof Order).toBe('function');
			expect(Order.prototype.constructor).toBe(Order);
		});

		test('should have config as private property', () => {
			// The config is private but we can access it for testing purposes
			expect(order['config']).toBeDefined();
			expect(order['config'].accessToken).toBe('test_token');
		});
	});

	describe('extensibility', () => {
		test('should be ready to extend with additional methods', () => {
			// Verify the base structure is in place for future operations
			expect(order).toHaveProperty('config');
			expect(order['config']).toHaveProperty('accessToken');
			expect(order['config']).toHaveProperty('options');
		});
	});
});