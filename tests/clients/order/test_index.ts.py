import { Order } from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Testing Order client', () => {
	test('should create Order instance with MercadoPagoConfig', () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const order = new Order(client);
		expect(order).toBeInstanceOf(Order);
	});

	test('should extend MPBase', () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const order = new Order(client);
		expect(order).toHaveProperty('config');
	});
});