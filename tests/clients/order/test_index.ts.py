import { Order } from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import get from './get';
import create from './create';
import process from './process';
import cancel from './cancel';
import capture from './capture';
import refund from './refund';
import createTransaction from './transaction/create';
import updateTransaction from './transaction/update';
import deleteTransaction from './transaction/delete';

jest.mock('./get');
jest.mock('./create');
jest.mock('./process');
jest.mock('./cancel');
jest.mock('./capture');
jest.mock('./refund');
jest.mock('./transaction/create');
jest.mock('./transaction/update');
jest.mock('./transaction/delete');

describe('Order Client', () => {
	let orderClient: Order;
	let mockConfig: MercadoPagoConfig;

	beforeEach(() => {
		mockConfig = new MercadoPagoConfig({ accessToken: 'test_token' });
		orderClient = new Order(mockConfig);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		test('should call create function with correct parameters', async () => {
			const body = {
				type: 'online',
				total_amount: '100.00',
				external_reference: 'test_ref',
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
			const requestOptions = { timeout: 5000 };

			await orderClient.create({ body, requestOptions });

			expect(create).toHaveBeenCalledWith({
				body,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions,
				}),
			});
		});
	});

	describe('get', () => {
		test('should call get function with correct parameters', async () => {
			const id = 'order_123';
			const requestOptions = { timeout: 5000 };

			await orderClient.get({ id, requestOptions });

			expect(get).toHaveBeenCalledWith({
				id,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions,
				}),
			});
		});
	});

	describe('process', () => {
		test('should call process function with correct parameters', async () => {
			const id = 'order_123';
			const requestOptions = { timeout: 5000 };

			await orderClient.process({ id, requestOptions });

			expect(process).toHaveBeenCalledWith({
				id,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions,
				}),
			});
		});
	});

	describe('cancel', () => {
		test('should call cancel function with correct parameters', async () => {
			const id = 'order_123';
			const requestOptions = { timeout: 5000 };

			await orderClient.cancel({ id, requestOptions });

			expect(cancel).toHaveBeenCalledWith({
				id,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions,
				}),
			});
		});
	});

	describe('capture', () => {
		test('should call capture function with correct parameters', async () => {
			const id = 'order_123';
			const requestOptions = { timeout: 5000 };

			await orderClient.capture({ id, requestOptions });

			expect(capture).toHaveBeenCalledWith({
				id,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions,
				}),
			});
		});
	});

	describe('refund', () => {
		test('should call refund function with correct parameters for partial refund', async () => {
			const id = 'order_123';
			const body = {
				transactions: [
					{
						id: 'txn_123',
						amount: '25.00',
					},
				],
			};
			const requestOptions = { timeout: 5000 };

			await orderClient.refund({ id, body, requestOptions });

			expect(refund).toHaveBeenCalledWith({
				id,
				body,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions,
				}),
			});
		});

		test('should call refund function without body for total refund', async () => {
			const id = 'order_123';
			const requestOptions = { timeout: 5000 };

			await orderClient.refund({ id, requestOptions });

			expect(refund).toHaveBeenCalledWith({
				id,
				body: undefined,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions,
				}),
			});
		});
	});

	describe('createTransaction', () => {
		test('should call createTransaction function with correct parameters', async () => {
			const id = 'order_123';
			const body = {
				payments: [
					{
						amount: '50.00',
						payment_method: {
							id: 'pix',
							type: 'bank_transfer',
						},
					},
				],
			};
			const requestOptions = { timeout: 5000 };

			await orderClient.createTransaction({ id, body, requestOptions });

			expect(createTransaction).toHaveBeenCalledWith({
				id,
				body,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions,
				}),
			});
		});
	});

	describe('updateTransaction', () => {
		test('should call updateTransaction function with correct parameters', async () => {
			const id = 'order_123';
			const transactionId = 'txn_123';
			const body = {
				payment_method: {
					installments: 3,
				},
			};
			const requestOptions = { timeout: 5000 };

			await orderClient.updateTransaction({ id, transactionId, body, requestOptions });

			expect(updateTransaction).toHaveBeenCalledWith({
				id,
				transactionId,
				body,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions,
				}),
			});
		});
	});

	describe('deleteTransaction', () => {
		test('should call deleteTransaction function with correct parameters', async () => {
			const id = 'order_123';
			const transactionId = 'txn_123';
			const requestOptions = { timeout: 5000 };

			await orderClient.deleteTransaction({ id, transactionId, requestOptions });

			expect(deleteTransaction).toHaveBeenCalledWith({
				id,
				transactionId,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions,
				}),
			});
		});
	});

	describe('requestOptions merging', () => {
		test('should merge global config options with request options', async () => {
			const globalOptions = { timeout: 3000 };
			const configWithOptions = new MercadoPagoConfig({
				accessToken: 'test_token',
				options: globalOptions,
			});
			const orderWithOptions = new Order(configWithOptions);

			const id = 'order_123';
			const requestOptions = { timeout: 5000 };

			await orderWithOptions.get({ id, requestOptions });

			expect(get).toHaveBeenCalledWith({
				id,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions,
				}),
			});
		});
	});
});