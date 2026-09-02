import { Order } from '.';
import create from './create';
import get from './get';
import cancel from './cancel';
import capture from './capture';
import process from './process';
import refund from './refund';
import createTransaction from './transaction/create';
import updateTransaction from './transaction/update';
import deleteTransaction from './transaction/delete';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('./create');
jest.mock('./get');
jest.mock('./cancel');
jest.mock('./capture');
jest.mock('./process');
jest.mock('./refund');
jest.mock('./transaction/create');
jest.mock('./transaction/update');
jest.mock('./transaction/delete');

describe('Order Client', () => {
	let config: MercadoPagoConfig;
	let order: Order;

	beforeEach(() => {
		config = new MercadoPagoConfig({ accessToken: 'test-access-token' });
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
				external_reference: 'ref-123',
				transactions: {
					payments: [
						{
							amount: '100.00',
							payment_method: {
								id: 'pix',
								type: 'bank_transfer'
							}
						}
					]
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

		test('should merge request options', async () => {
			const body = { type: 'online', total_amount: '100.00' };
			const requestOptions = { timeout: 10000 };

			await order.create({ body, requestOptions });

			expect(config.options).toEqual({ timeout: 10000 });
		});
	});

	describe('get', () => {
		test('should call get with correct parameters', async () => {
			const id = 'order-123';
			const mockResponse = { id, type: 'online' };
			(get as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.get({ id });

			expect(get).toHaveBeenCalledWith({ id, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options', async () => {
			const requestOptions = { timeout: 5000 };

			await order.get({ id: 'order-123', requestOptions });

			expect(config.options).toEqual({ timeout: 5000 });
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

		test('should merge request options', async () => {
			const requestOptions = { timeout: 8000 };

			await order.cancel({ id: 'order-123', requestOptions });

			expect(config.options).toEqual({ timeout: 8000 });
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

		test('should merge request options', async () => {
			const requestOptions = { timeout: 12000 };

			await order.capture({ id: 'order-123', requestOptions });

			expect(config.options).toEqual({ timeout: 12000 });
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

		test('should merge request options', async () => {
			const requestOptions = { timeout: 7000 };

			await order.process({ id: 'order-123', requestOptions });

			expect(config.options).toEqual({ timeout: 7000 });
		});
	});

	describe('refund', () => {
		test('should call refund with full refund (no body)', async () => {
			const id = 'order-123';
			const mockResponse = { id, status: 'refunded' };
			(refund as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.refund({ id });

			expect(refund).toHaveBeenCalledWith({ id, body: undefined, config });
			expect(result).toEqual(mockResponse);
		});

		test('should call refund with partial refund (with body)', async () => {
			const id = 'order-123';
			const body = {
				transactions: [
					{
						id: 'txn-456',
						amount: '25.00'
					}
				]
			};
			const mockResponse = { id, status: 'processed', status_detail: 'partially_refunded' };
			(refund as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.refund({ id, body });

			expect(refund).toHaveBeenCalledWith({ id, body, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options', async () => {
			const requestOptions = { timeout: 15000 };

			await order.refund({ id: 'order-123', requestOptions });

			expect(config.options).toEqual({ timeout: 15000 });
		});
	});

	describe('createTransaction', () => {
		test('should call createTransaction with correct parameters', async () => {
			const id = 'order-123';
			const body = {
				payments: [
					{
						amount: '50.00',
						payment_method: {
							id: 'visa',
							type: 'credit_card',
							token: 'card-token-789'
						}
					}
				]
			};
			const mockResponse = { payments: [{ id: 'txn-789', amount: '50.00' }] };
			(createTransaction as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.createTransaction({ id, body });

			expect(createTransaction).toHaveBeenCalledWith({ id, body, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options', async () => {
			const requestOptions = { timeout: 9000 };
			const body = { payments: [] };

			await order.createTransaction({ id: 'order-123', body, requestOptions });

			expect(config.options).toEqual({ timeout: 9000 });
		});
	});

	describe('updateTransaction', () => {
		test('should call updateTransaction with correct parameters', async () => {
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

		test('should merge request options', async () => {
			const requestOptions = { timeout: 6000 };
			const body = { payment_method: {} };

			await order.updateTransaction({
				id: 'order-123',
				transactionId: 'txn-456',
				body,
				requestOptions
			});

			expect(config.options).toEqual({ timeout: 6000 });
		});
	});

	describe('deleteTransaction', () => {
		test('should call deleteTransaction with correct parameters', async () => {
			const id = 'order-123';
			const transactionId = 'txn-456';
			const mockResponse = { api_response: { status: 204 } };
			(deleteTransaction as jest.Mock).mockResolvedValue(mockResponse);

			const result = await order.deleteTransaction({ id, transactionId });

			expect(deleteTransaction).toHaveBeenCalledWith({ id, transactionId, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options', async () => {
			const requestOptions = { timeout: 4000 };

			await order.deleteTransaction({
				id: 'order-123',
				transactionId: 'txn-456',
				requestOptions
			});

			expect(config.options).toEqual({ timeout: 4000 });
		});
	});
});