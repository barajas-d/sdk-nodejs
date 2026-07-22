import { Order } from './index';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import create from './create';
import get from './get';
import process from './process';
import cancel from './cancel';
import capture from './capture';
import refund from './refund';
import createTransaction from './transaction/create';
import updateTransaction from './transaction/update';
import deleteTransaction from './transaction/delete';

jest.mock('./create');
jest.mock('./get');
jest.mock('./process');
jest.mock('./cancel');
jest.mock('./capture');
jest.mock('./refund');
jest.mock('./transaction/create');
jest.mock('./transaction/update');
jest.mock('./transaction/delete');

describe('Order Client', () => {
	let config: MercadoPagoConfig;
	let order: Order;

	beforeEach(() => {
		config = new MercadoPagoConfig({ accessToken: 'test-token' });
		order = new Order(config);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		test('should call create function with correct parameters', async () => {
			const body = {
				type: 'online',
				total_amount: '100.00',
				external_reference: 'ext_ref_123',
				transactions: {
					payments: [{
						amount: '100.00',
						payment_method: {
							id: 'pix',
							type: 'bank_transfer'
						}
					}]
				},
				payer: {
					email: 'test@example.com'
				}
			};

			const mockResponse = { id: 'order-123', ...body };
			(create as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.create({ body });

			expect(create).toHaveBeenCalledWith({ body, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const body = { type: 'online', total_amount: '100.00' };
			const requestOptions = { timeout: 10000 };

			await order.create({ body, requestOptions });

			expect(create).toHaveBeenCalledWith({
				body,
				config: expect.objectContaining({
					options: expect.objectContaining(requestOptions)
				})
			});
		});
	});

	describe('get', () => {
		test('should call get function with correct parameters', async () => {
			const id = 'order-123';
			const mockResponse = { id, type: 'online', total_amount: '100.00' };
			(get as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.get({ id });

			expect(get).toHaveBeenCalledWith({ id, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const requestOptions = { timeout: 5000 };

			await order.get({ id, requestOptions });

			expect(get).toHaveBeenCalledWith({
				id,
				config: expect.objectContaining({
					options: expect.objectContaining(requestOptions)
				})
			});
		});
	});

	describe('process', () => {
		test('should call process function with correct parameters', async () => {
			const id = 'order-123';
			const mockResponse = { id, status: 'processed' };
			(process as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.process({ id });

			expect(process).toHaveBeenCalledWith({ id, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const requestOptions = { timeout: 15000 };

			await order.process({ id, requestOptions });

			expect(process).toHaveBeenCalledWith({
				id,
				config: expect.objectContaining({
					options: expect.objectContaining(requestOptions)
				})
			});
		});
	});

	describe('cancel', () => {
		test('should call cancel function with correct parameters', async () => {
			const id = 'order-123';
			const mockResponse = { id, status: 'canceled' };
			(cancel as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.cancel({ id });

			expect(cancel).toHaveBeenCalledWith({ id, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const requestOptions = { timeout: 8000 };

			await order.cancel({ id, requestOptions });

			expect(cancel).toHaveBeenCalledWith({
				id,
				config: expect.objectContaining({
					options: expect.objectContaining(requestOptions)
				})
			});
		});
	});

	describe('capture', () => {
		test('should call capture function with correct parameters', async () => {
			const id = 'order-123';
			const mockResponse = { id, status: 'processed' };
			(capture as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.capture({ id });

			expect(capture).toHaveBeenCalledWith({ id, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const requestOptions = { timeout: 12000 };

			await order.capture({ id, requestOptions });

			expect(capture).toHaveBeenCalledWith({
				id,
				config: expect.objectContaining({
					options: expect.objectContaining(requestOptions)
				})
			});
		});
	});

	describe('refund', () => {
		test('should call refund function with correct parameters for partial refund', async () => {
			const id = 'order-123';
			const body = {
				transactions: [{
					id: 'txn-456',
					amount: '25.00'
				}]
			};
			const mockResponse = { id, status: 'processed', transactions: { refunds: [{ amount: '25.00' }] } };
			(refund as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.refund({ id, body });

			expect(refund).toHaveBeenCalledWith({ id, body, config });
			expect(result).toEqual(mockResponse);
		});

		test('should call refund function for full refund without body', async () => {
			const id = 'order-123';
			const mockResponse = { id, status: 'refunded' };
			(refund as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.refund({ id });

			expect(refund).toHaveBeenCalledWith({ id, body: undefined, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const requestOptions = { timeout: 20000 };

			await order.refund({ id, requestOptions });

			expect(refund).toHaveBeenCalledWith({
				id,
				body: undefined,
				config: expect.objectContaining({
					options: expect.objectContaining(requestOptions)
				})
			});
		});
	});

	describe('createTransaction', () => {
		test('should call createTransaction function with correct parameters', async () => {
			const id = 'order-123';
			const body = {
				payments: [{
					amount: '50.00',
					payment_method: {
						id: 'master',
						type: 'credit_card'
					}
				}]
			};
			const mockResponse = { payments: [{ id: 'txn-789', amount: '50.00' }] };
			(createTransaction as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.createTransaction({ id, body });

			expect(createTransaction).toHaveBeenCalledWith({ id, body, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const body = { payments: [] };
			const requestOptions = { timeout: 7000 };

			await order.createTransaction({ id, body, requestOptions });

			expect(createTransaction).toHaveBeenCalledWith({
				id,
				body,
				config: expect.objectContaining({
					options: expect.objectContaining(requestOptions)
				})
			});
		});
	});

	describe('updateTransaction', () => {
		test('should call updateTransaction function with correct parameters', async () => {
			const id = 'order-123';
			const transactionId = 'txn-456';
			const body = {
				payment_method: {
					installments: 3
				}
			};
			const mockResponse = { id: transactionId, payment_method: { installments: 3 } };
			(updateTransaction as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.updateTransaction({ id, transactionId, body });

			expect(updateTransaction).toHaveBeenCalledWith({ id, transactionId, body, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const transactionId = 'txn-456';
			const body = { payment_method: { installments: 2 } };
			const requestOptions = { timeout: 6000 };

			await order.updateTransaction({ id, transactionId, body, requestOptions });

			expect(updateTransaction).toHaveBeenCalledWith({
				id,
				transactionId,
				body,
				config: expect.objectContaining({
					options: expect.objectContaining(requestOptions)
				})
			});
		});
	});

	describe('deleteTransaction', () => {
		test('should call deleteTransaction function with correct parameters', async () => {
			const id = 'order-123';
			const transactionId = 'txn-456';
			(deleteTransaction as jest.Mock).mockResolvedValue(undefined);

			await order.deleteTransaction({ id, transactionId });

			expect(deleteTransaction).toHaveBeenCalledWith({ id, transactionId, config });
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const transactionId = 'txn-456';
			const requestOptions = { timeout: 4000 };

			await order.deleteTransaction({ id, transactionId, requestOptions });

			expect(deleteTransaction).toHaveBeenCalledWith({
				id,
				transactionId,
				config: expect.objectContaining({
					options: expect.objectContaining(requestOptions)
				})
			});
		});
	});
});