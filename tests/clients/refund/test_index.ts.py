import { Refund } from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

describe('Refund client', () => {
	let refundClient: Refund;
	let mockPost: jest.SpyInstance;

	beforeEach(() => {
		const config = new MercadoPagoConfig({ accessToken: 'test_access_token' });
		refundClient = new Refund(config);
		mockPost = jest.spyOn(refundClient as any, 'post').mockResolvedValue({
			id: 123,
			payment_id: 456,
			amount: 100.00,
			status: 'approved'
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('refund method', () => {
		test('should create a full refund when amount is not provided', async () => {
			const payment_id = 456;
			
			await refundClient.refund({ payment_id });

			expect(mockPost).toHaveBeenCalledWith({
				path: `/v1/payments/${payment_id}/refunds`,
				body: undefined,
			});
		});

		test('should create a partial refund when amount is provided', async () => {
			const payment_id = 456;
			const amount = 50.00;
			
			await refundClient.refund({ payment_id, amount });

			expect(mockPost).toHaveBeenCalledWith({
				path: `/v1/payments/${payment_id}/refunds`,
				body: { amount },
			});
		});

		test('should accept payment_id as string', async () => {
			const payment_id = '456';
			
			await refundClient.refund({ payment_id });

			expect(mockPost).toHaveBeenCalledWith({
				path: `/v1/payments/${payment_id}/refunds`,
				body: undefined,
			});
		});

		test('should return refund response', async () => {
			const payment_id = 456;
			const expectedResponse = {
				id: 123,
				payment_id: 456,
				amount: 100.00,
				status: 'approved'
			};

			mockPost.mockResolvedValue(expectedResponse);

			const result = await refundClient.refund({ payment_id });

			expect(result).toEqual(expectedResponse);
		});

		test('should handle partial refund with decimal amount', async () => {
			const payment_id = 456;
			const amount = 25.50;
			
			await refundClient.refund({ payment_id, amount });

			expect(mockPost).toHaveBeenCalledWith({
				path: `/v1/payments/${payment_id}/refunds`,
				body: { amount: 25.50 },
			});
		});

		test('should handle amount of 0', async () => {
			const payment_id = 456;
			const amount = 0;
			
			await refundClient.refund({ payment_id, amount });

			expect(mockPost).toHaveBeenCalledWith({
				path: `/v1/payments/${payment_id}/refunds`,
				body: { amount: 0 },
			});
		});

		test('should construct correct API path with payment_id', async () => {
			const payment_id = 789;
			
			await refundClient.refund({ payment_id });

			expect(mockPost).toHaveBeenCalledWith(
				expect.objectContaining({
					path: '/v1/payments/789/refunds',
				})
			);
		});
	});
});