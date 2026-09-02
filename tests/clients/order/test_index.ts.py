import { Order } from './index';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import create from './create';
import get from './get';
import process from './process';
import cancel from './cancel';
import capture from './capture';
import refund from './refund';
import getRefund from './getRefund';
import createTransaction from './transaction/create';
import updateTransaction from './transaction/update';
import deleteTransaction from './transaction/delete';

jest.mock('./create');
jest.mock('./get');
jest.mock('./process');
jest.mock('./cancel');
jest.mock('./capture');
jest.mock('./refund');
jest.mock('./getRefund');
jest.mock('./transaction/create');
jest.mock('./transaction/update');
jest.mock('./transaction/delete');

describe('Order', () => {
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

			await order.create({ body });

			expect(create).toHaveBeenCalledWith({
				body,
				config,
			});
		});

		test('should merge request options with config options', async () => {
			const body = { type: 'online', total_amount: '100.00' };
			const requestOptions = { timeout: 10000 };

			await order.create({ body, requestOptions });

			expect(config.options).toEqual(requestOptions);
		});
	});

	describe('get', () => {
		test('should call get with correct parameters', async () => {
			const id = 'order-123';

			await order.get({ id });

			expect(get).toHaveBeenCalledWith({
				id,
				config,
			});
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const requestOptions = { timeout: 5000 };

			await order.get({ id, requestOptions });

			expect(config.options).toEqual(requestOptions);
		});
	});

	describe('process', () => {
		test('should call process with correct parameters', async () => {
			const id = 'order-123';

			await order.process({ id });

			expect(process).toHaveBeenCalledWith({
				id,
				config,
			});
		});
	});

	describe('cancel', () => {
		test('should call cancel with correct parameters', async () => {
			const id = 'order-123';

			await order.cancel({ id });

			expect(cancel).toHaveBeenCalledWith({
				id,
				config,
			});
		});
	});

	describe('capture', () => {
		test('should call capture with correct parameters', async () => {
			const id = 'order-123';

			await order.capture({ id });

			expect(capture).toHaveBeenCalledWith({
				id,
				config,
			});
		});
	});

	describe('refund', () => {
		test('should call refund with correct parameters', async () => {
			const id = 'order-123';
			const body = {
				transactions: [
					{
						id: 'txn-456',
						amount: '50.00',
					},
				],
			};

			await order.refund({ id, body });

			expect(refund).toHaveBeenCalledWith({
				id,
				body,
				config,
			});
		});

		test('should handle refund without body parameter', async () => {
			const id = 'order-123';

			await order.refund({ id });

			expect(refund).toHaveBeenCalledWith({
				id,
				body: undefined,
				config,
			});
		});
	});

	describe('getRefund', () => {
		test('should call getRefund with correct parameters', async () => {
			const orderId = 'order-123';

			await order.getRefund({ orderId });

			expect(getRefund).toHaveBeenCalledWith({
				orderId,
				config,
			});
		});

		test('should merge request options with config options', async () => {
			const orderId = 'order-123';
			const requestOptions = { timeout: 8000 };

			await order.getRefund({ orderId, requestOptions });

			expect(config.options).toEqual(requestOptions);
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

			await order.createTransaction({ id, body });

			expect(createTransaction).toHaveBeenCalledWith({
				id,
				body,
				config,
			});
		});
	});

	describe('updateTransaction', () => {
		test('should call updateTransaction with correct parameters', async () => {
			const id = 'order-123';
			const transactionId = 'txn-456';
			const body = {
				payment_method: {
					installments: 3,
				},
			};

			await order.updateTransaction({ id, transactionId, body });

			expect(updateTransaction).toHaveBeenCalledWith({
				id,
				transactionId,
				body,
				config,
			});
		});
	});

	describe('deleteTransaction', () => {
		test('should call deleteTransaction with correct parameters', async () => {
			const id = 'order-123';
			const transactionId = 'txn-456';

			await order.deleteTransaction({ id, transactionId });

			expect(deleteTransaction).toHaveBeenCalledWith({
				id,
				transactionId,
				config,
			});
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const transactionId = 'txn-456';
			const requestOptions = { timeout: 3000 };

			await order.deleteTransaction({ id, transactionId, requestOptions });

			expect(config.options).toEqual(requestOptions);
		});
	});
});