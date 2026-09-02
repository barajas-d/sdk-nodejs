import { Order } from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import create from './create';
import get from './get';
import process from './process';
import capture from './capture';
import cancel from './cancel';
import refund from './refund';
import confirm from './confirm';
import createTransaction from './transaction/create';
import updateTransaction from './transaction/update';
import deleteTransaction from './transaction/delete';

jest.mock('./create');
jest.mock('./get');
jest.mock('./process');
jest.mock('./capture');
jest.mock('./cancel');
jest.mock('./refund');
jest.mock('./confirm');
jest.mock('./transaction/create');
jest.mock('./transaction/update');
jest.mock('./transaction/delete');

describe('Order Client', () => {
	let client: MercadoPagoConfig;
	let order: Order;

	beforeEach(() => {
		client = new MercadoPagoConfig({ accessToken: 'test-token' });
		order = new Order(client);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		test('should call create with correct parameters', async () => {
			const body = {
				type: 'online',
				total_amount: '100.00',
				external_reference: 'test-ref',
				transactions: {
					payments: [{
						amount: '100.00',
						payment_method: {
							id: 'pix',
							type: 'bank_transfer',
						},
					}],
				},
				payer: {
					email: 'test@example.com',
				},
			};

			await order.create({ body });

			expect(create).toHaveBeenCalledWith({
				body,
				config: client
			});
		});

		test('should merge request options with config options', async () => {
			const body = { type: 'online', total_amount: '100.00' };
			const requestOptions = { timeout: 5000 };

			await order.create({ body, requestOptions });

			expect(client.options).toEqual(requestOptions);
		});
	});

	describe('get', () => {
		test('should call get with correct parameters', async () => {
			const id = 'order-123';

			await order.get({ id });

			expect(get).toHaveBeenCalledWith({
				id,
				config: client
			});
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const requestOptions = { timeout: 3000 };

			await order.get({ id, requestOptions });

			expect(client.options).toEqual(requestOptions);
		});
	});

	describe('process', () => {
		test('should call process with correct parameters', async () => {
			const id = 'order-123';

			await order.process({ id });

			expect(process).toHaveBeenCalledWith({
				id,
				config: client
			});
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const requestOptions = { timeout: 10000 };

			await order.process({ id, requestOptions });

			expect(client.options).toEqual(requestOptions);
		});
	});

	describe('capture', () => {
		test('should call capture with correct parameters', async () => {
			const id = 'order-123';

			await order.capture({ id });

			expect(capture).toHaveBeenCalledWith({
				id,
				config: client
			});
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const requestOptions = { timeout: 8000 };

			await order.capture({ id, requestOptions });

			expect(client.options).toEqual(requestOptions);
		});
	});

	describe('cancel', () => {
		test('should call cancel with correct parameters', async () => {
			const id = 'order-123';

			await order.cancel({ id });

			expect(cancel).toHaveBeenCalledWith({
				id,
				config: client
			});
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const requestOptions = { timeout: 7000 };

			await order.cancel({ id, requestOptions });

			expect(client.options).toEqual(requestOptions);
		});
	});

	describe('refund', () => {
		test('should call refund with correct parameters', async () => {
			const id = 'order-123';
			const body = {
				transactions: [
					{
						id: 'txn-456',
						amount: '50.00'
					}
				]
			};

			await order.refund({ id, body });

			expect(refund).toHaveBeenCalledWith({
				id,
				body,
				config: client
			});
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const body = { transactions: [] };
			const requestOptions = { timeout: 6000 };

			await order.refund({ id, body, requestOptions });

			expect(client.options).toEqual(requestOptions);
		});
	});

	describe('confirmOrder', () => {
		test('should call confirm with correct parameters', async () => {
			const orderId = 'order-123';
			const body = {
				transactions: [
					{
						id: 'txn-456',
						amount: '100.00'
					}
				]
			};

			await order.confirmOrder({ orderId, body });

			expect(confirm).toHaveBeenCalledWith({
				orderId,
				body,
				config: client
			});
		});

		test('should merge request options with config options', async () => {
			const orderId = 'order-123';
			const body = { transactions: [] };
			const requestOptions = { timeout: 5000 };

			await order.confirmOrder({ orderId, body, requestOptions });

			expect(client.options).toEqual(requestOptions);
		});
	});

	describe('createTransaction', () => {
		test('should call createTransaction with correct parameters', async () => {
			const id = 'order-123';
			const body = {
				payments: [{
					amount: '100.00',
					payment_method: {
						id: 'pix',
						type: 'bank_transfer',
					}
				}]
			};

			await order.createTransaction({ id, body });

			expect(createTransaction).toHaveBeenCalledWith({
				id,
				body,
				config: client
			});
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const body = { payments: [] };
			const requestOptions = { timeout: 4000 };

			await order.createTransaction({ id, body, requestOptions });

			expect(client.options).toEqual(requestOptions);
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

			await order.updateTransaction({ id, transactionId, body });

			expect(updateTransaction).toHaveBeenCalledWith({
				id,
				transactionId,
				body,
				config: client
			});
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const transactionId = 'txn-456';
			const body = { payment_method: {} };
			const requestOptions = { timeout: 9000 };

			await order.updateTransaction({ id, transactionId, body, requestOptions });

			expect(client.options).toEqual(requestOptions);
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
				config: client
			});
		});

		test('should merge request options with config options', async () => {
			const id = 'order-123';
			const transactionId = 'txn-456';
			const requestOptions = { timeout: 2000 };

			await order.deleteTransaction({ id, transactionId, requestOptions });

			expect(client.options).toEqual(requestOptions);
		});
	});
});