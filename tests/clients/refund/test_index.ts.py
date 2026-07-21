import { Refund } from './index';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Refund Client', () => {
	let client: MercadoPagoConfig;
	let refundClient: Refund;

	beforeEach(() => {
		client = new MercadoPagoConfig({ accessToken: 'test-token' });
		refundClient = new Refund(client);
		jest.clearAllMocks();
	});

	describe('refund method', () => {
		test('should make a POST request for full refund when amount is not provided', async () => {
			const spyFetch = jest.spyOn(RestClient, 'fetch');
			
			await refundClient.refund({ paymentId: 123456789 });

			expect(spyFetch).toHaveBeenCalledWith(
				'/v1/payments/123456789/refunds',
				expect.objectContaining({
					method: 'POST',
					headers: { 'Authorization': 'Bearer test-token' },
					body: undefined
				})
			);
		});

		test('should make a POST request for partial refund when amount is provided', async () => {
			const spyFetch = jest.spyOn(RestClient, 'fetch');
			const body = { amount: 50.00 };
			
			await refundClient.refund({ paymentId: 123456789, body });

			expect(spyFetch).toHaveBeenCalledWith(
				'/v1/payments/123456789/refunds',
				expect.objectContaining({
					method: 'POST',
					headers: { 'Authorization': 'Bearer test-token' },
					body: JSON.stringify(body)
				})
			);
		});

		test('should handle string paymentId', async () => {
			const spyFetch = jest.spyOn(RestClient, 'fetch');
			
			await refundClient.refund({ paymentId: '123456789' });

			expect(spyFetch).toHaveBeenCalledWith(
				'/v1/payments/123456789/refunds',
				expect.objectContaining({
					method: 'POST',
					headers: { 'Authorization': 'Bearer test-token' }
				})
			);
		});

		test('should pass forward request options to RestClient.fetch', async () => {
			const spyFetch = jest.spyOn(RestClient, 'fetch');
			const requestOptions = { timeout: 10000 };
			
			await refundClient.refund({ 
				paymentId: 123456789,
				requestOptions 
			});

			expect(spyFetch).toHaveBeenCalledWith(
				'/v1/payments/123456789/refunds',
				expect.objectContaining({
					method: 'POST',
					headers: { 'Authorization': 'Bearer test-token' },
					timeout: 10000
				})
			);
		});

		test('should include reason and metadata when provided', async () => {
			const spyFetch = jest.spyOn(RestClient, 'fetch');
			const body = { 
				amount: 25.50,
				reason: 'Customer request',
				metadata: { order_id: 'ORD-123' }
			};
			
			await refundClient.refund({ paymentId: 123456789, body });

			expect(spyFetch).toHaveBeenCalledWith(
				'/v1/payments/123456789/refunds',
				expect.objectContaining({
					method: 'POST',
					headers: { 'Authorization': 'Bearer test-token' },
					body: JSON.stringify(body)
				})
			);
		});

		test('should merge global config options with request options', async () => {
			const clientWithOptions = new MercadoPagoConfig({ 
				accessToken: 'test-token',
				options: { timeout: 5000 }
			});
			const refundClientWithOptions = new Refund(clientWithOptions);
			const spyFetch = jest.spyOn(RestClient, 'fetch');
			
			await refundClientWithOptions.refund({ 
				paymentId: 123456789,
				requestOptions: { timeout: 8000 }
			});

			expect(spyFetch).toHaveBeenCalledWith(
				'/v1/payments/123456789/refunds',
				expect.objectContaining({
					method: 'POST',
					headers: { 'Authorization': 'Bearer test-token' },
					timeout: 8000
				})
			);
		});

		test('should handle empty body object', async () => {
			const spyFetch = jest.spyOn(RestClient, 'fetch');
			
			await refundClient.refund({ paymentId: 123456789, body: {} });

			expect(spyFetch).toHaveBeenCalledWith(
				'/v1/payments/123456789/refunds',
				expect.objectContaining({
					method: 'POST',
					headers: { 'Authorization': 'Bearer test-token' },
					body: JSON.stringify({})
				})
			);
		});
	});
});