import { Order } from './index';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import create from './create';
import get from './get';
import cancel from './cancel';
import capture from './capture';
import process from './process';
import refund from './refund';
import getRefunds from './getRefunds';
import createTransaction from './transaction/create';
import updateTransaction from './transaction/update';
import deleteTransaction from './transaction/delete';

jest.mock('./create');
jest.mock('./get');
jest.mock('./cancel');
jest.mock('./capture');
jest.mock('./process');
jest.mock('./refund');
jest.mock('./getRefunds');
jest.mock('./transaction/create');
jest.mock('./transaction/update');
jest.mock('./transaction/delete');

describe('Order Client', () => {
	let order: Order;
	let config: MercadoPagoConfig;

	beforeEach(() => {
		config = new MercadoPagoConfig({ accessToken: 'test-token' });
		order = new Order(config);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		test('should call create with correct parameters', async () => {
			const body = {
				type: 'online',
				total_amount: '100.00',
				external_reference: 'ext_ref_123',
				transactions: {
					payments: [
						{
							amount: '100.00',
							payment_method: {
								id: 'pix',
								type: 'bank_transfer',
							},
						},
					],
				},
				payer: {
					email: 'test@example.com',
				},
			};

			const mockResponse = { id: 'order-123', ...body };
			(create as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.create({ body });

			expect(create).toHaveBeenCalledWith({ body, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const body = {
				type: 'online',
				total_amount: '100.00',
				payer: { email: 'test@example.com' },
			};

			const requestOptions = { timeout: 5000 };
			await order.create({ body, requestOptions });

			expect(config.options).toEqual(expect.objectContaining(requestOptions));
		});
	});

	describe('get', () => {
		test('should call get with correct parameters', async () => {
			const id = 'order-123';
			const mockResponse = { id, type: 'online', status: 'processed' };
			(get as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.get({ id });

			expect(get).toHaveBeenCalledWith({ id, config });
			expect(result).toEqual(mockResponse);
		});
	});

	describe('cancel', () => {
		test('should call cancel with correct parameters', async () => {
			const id = 'order-123';
			const mockResponse = { id, status: 'canceled' };
			(cancel as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.cancel({ id });

			expect(cancel).toHaveBeenCalledWith({ id, config });
			expect(result).toEqual(mockResponse);
		});
	});

	describe('capture', () => {
		test('should call capture with correct parameters', async () => {
			const id = 'order-123';
			const mockResponse = { id, status: 'processed' };
			(capture as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.capture({ id });

			expect(capture).toHaveBeenCalledWith({ id, config });
			expect(result).toEqual(mockResponse);
		});
	});

	describe('process', () => {
		test('should call process with correct parameters', async () => {
			const id = 'order-123';
			const mockResponse = { id, status: 'processed' };
			(process as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.process({ id });

			expect(process).toHaveBeenCalledWith({ id, config });
			expect(result).toEqual(mockResponse);
		});
	});

	describe('refund', () => {
		test('should call refund with correct parameters for partial refund', async () => {
			const id = 'order-123';
			const body = {
				transactions: [
					{
						id: 'txn-123',
						amount: '25.00',
					},
				],
			};
			const mockResponse = { id, status: 'processed', status_detail: 'partially_refunded' };
			(refund as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.refund({ id, body });

			expect(refund).toHaveBeenCalledWith({ id, body, config });
			expect(result).toEqual(mockResponse);
		});

		test('should call refund with correct parameters for total refund', async () => {
			const id = 'order-123';
			const mockResponse = { id, status: 'refunded' };
			(refund as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.refund({ id });

			expect(refund).toHaveBeenCalledWith({ id, body: undefined, config });
			expect(result).toEqual(mockResponse);
		});
	});

	describe('getRefunds', () => {
		test('should call getRefunds with correct parameters', async () => {
			const orderId = 'order-123';
			const mockResponse = {
				refunds: [
					{
						id: 'refund-1',
						amount: '25.00',
						status: 'processed',
					},
				],
			};
			(getRefunds as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.getRefunds({ orderId });

			expect(getRefunds).toHaveBeenCalledWith({
				orderId,
				xIdempotencyKey: undefined,
				xProductId: undefined,
				config,
			});
			expect(result).toEqual(mockResponse);
		});

		test('should call getRefunds with optional headers', async () => {
			const orderId = 'order-123';
			const xIdempotencyKey = 'idempotency-key-123';
			const xProductId = 'product-id-123';
			const mockResponse = { refunds: [] };
			(getRefunds as jest.Mock).mockResolvedValue(mockResponse);

			await order.getRefunds({ orderId, xIdempotencyKey, xProductId });

			expect(getRefunds).toHaveBeenCalledWith({
				orderId,
				xIdempotencyKey,
				xProductId,
				config,
			});
		});
	});

	describe('createTransaction', () => {
		test('should call createTransaction with correct parameters', async () => {
			const id = 'order-123';
			const body = {
				payments: [
					{
						amount: '100.00',
						payment_method: {
							id: 'pix',
							type: 'bank_transfer',
						},
					},
				],
			};
			const mockResponse = {
				payments: [
					{
						id: 'payment-123',
						amount: '100.00',
						payment_method: {
							id: 'pix',
							type: 'bank_transfer',
						},
					},
				],
			};
			(createTransaction as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.createTransaction({ id, body });

			expect(createTransaction).toHaveBeenCalledWith({ id, body, config });
			expect(result).toEqual(mockResponse);
		});
	});

	describe('updateTransaction', () => {
		test('should call updateTransaction with correct parameters', async () => {
			const id = 'order-123';
			const transactionId = 'txn-123';
			const body = {
				payment_method: {
					installments: 3,
				},
			};
			const mockResponse = {
				id: transactionId,
				payment_method: {
					installments: 3,
				},
			};
			(updateTransaction as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.updateTransaction({ id, transactionId, body });

			expect(updateTransaction).toHaveBeenCalledWith({ id, transactionId, body, config });
			expect(result).toEqual(mockResponse);
		});
	});

	describe('deleteTransaction', () => {
		test('should call deleteTransaction with correct parameters', async () => {
			const id = 'order-123';
			const transactionId = 'txn-123';
			(deleteTransaction as jest.Mock).mockResolvedValue(undefined);

			await order.deleteTransaction({ id, transactionId });

			expect(deleteTransaction).toHaveBeenCalledWith({ id, transactionId, config });
		});
	});
});