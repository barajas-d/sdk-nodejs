import { Order } from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Order client', () => {
	test('should instantiate Order client with MercadoPagoConfig', () => {
		const config = new MercadoPagoConfig({ accessToken: 'test_token' });
		const order = new Order(config);
		
		expect(order).toBeInstanceOf(Order);
	});

	test('should store config internally', () => {
		const config = new MercadoPagoConfig({ 
			accessToken: 'test_token',
			options: { timeout: 5000 }
		});
		const order = new Order(config);
		
		expect(order['config']).toBe(config);
		expect(order['config'].accessToken).toBe('test_token');
	});
});