import { Payment } from './';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import get from './get';
import create from './create';
import search from './search';
import capture from './capture';
import cancel from './cancel';

jest.mock('./get');
jest.mock('./create');
jest.mock('./search');
jest.mock('./capture');
jest.mock('./cancel');

describe('Payment Client', () => {
	let payment: Payment;
	let mockConfig: MercadoPagoConfig;

	beforeEach(() => {
		mockConfig = new MercadoPagoConfig({ accessToken: 'test-token' });
		payment = new Payment(mockConfig);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		test('should call create with correct parameters', async () => {
			const body = {
				transaction_amount: 100,
				payment_method_id: 'pix',
				payer: { email: 'test@example.com' }
			};
			const mockResponse = { id: 123, status: 'pending' };
			(create as jest.Mock).mockResolvedValue(mockResponse);

			const result = await payment.create({ body });

			expect(create).toHaveBeenCalledWith({
				body,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const body = { transaction_amount: 100, payment_method_id: 'pix', payer: { email: 'test@test.com' } };
			const requestOptions = { timeout: 10000 };
			(create as jest.Mock).mockResolvedValue({});

			await payment.create({ body, requestOptions });

			expect(mockConfig.options).toEqual(expect.objectContaining(requestOptions));
		});
	});

	describe('get', () => {
		test('should call get with correct parameters', async () => {
			const id = 123;
			const mockResponse = { id: 123, status: 'approved' };
			(get as jest.Mock).mockResolvedValue(mockResponse);

			const result = await payment.get({ id });

			expect(get).toHaveBeenCalledWith({
				id,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const id = 123;
			const requestOptions = { timeout: 5000 };
			(get as jest.Mock).mockResolvedValue({});

			await payment.get({ id, requestOptions });

			expect(mockConfig.options).toEqual(expect.objectContaining(requestOptions));
		});
	});

	describe('search', () => {
		test('should call search with correct parameters', async () => {
			const options = { external_reference: 'test-ref-001' };
			const mockResponse = { results: [], paging: { total: 0 } };
			(search as jest.Mock).mockResolvedValue(mockResponse);

			const result = await payment.search({ options });

			expect(search).toHaveBeenCalledWith({
				options,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
			expect(result).toEqual(mockResponse);
		});

		test('should call search without options', async () => {
			const mockResponse = { results: [], paging: { total: 0 } };
			(search as jest.Mock).mockResolvedValue(mockResponse);

			const result = await payment.search();

			expect(search).toHaveBeenCalledWith({
				options: undefined,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const options = { external_reference: 'ref-001' };
			const requestOptions = { timeout: 8000 };
			(search as jest.Mock).mockResolvedValue({ results: [], paging: {} });

			await payment.search({ options, requestOptions });

			expect(mockConfig.options).toEqual(expect.objectContaining(requestOptions));
		});
	});

	describe('capture', () => {
		test('should call capture with correct parameters', async () => {
			const id = 123;
			const transaction_amount = 50;
			const mockResponse = { id: 123, status: 'approved', transaction_amount: 50 };
			(capture as jest.Mock).mockResolvedValue(mockResponse);

			const result = await payment.capture({ id, transaction_amount });

			expect(capture).toHaveBeenCalledWith({
				id,
				transaction_amount,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
			expect(result).toEqual(mockResponse);
		});

		test('should call capture without transaction_amount', async () => {
			const id = 123;
			const mockResponse = { id: 123, status: 'approved' };
			(capture as jest.Mock).mockResolvedValue(mockResponse);

			const result = await payment.capture({ id });

			expect(capture).toHaveBeenCalledWith({
				id,
				transaction_amount: undefined,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const id = 123;
			const requestOptions = { timeout: 7000 };
			(capture as jest.Mock).mockResolvedValue({});

			await payment.capture({ id, requestOptions });

			expect(mockConfig.options).toEqual(expect.objectContaining(requestOptions));
		});
	});

	describe('cancel', () => {
		test('should call cancel with correct parameters', async () => {
			const id = 123;
			const mockResponse = { id: 123, status: 'cancelled' };
			(cancel as jest.Mock).mockResolvedValue(mockResponse);

			const result = await payment.cancel({ id });

			expect(cancel).toHaveBeenCalledWith({
				id,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options with config options', async () => {
			const id = 123;
			const requestOptions = { timeout: 6000 };
			(cancel as jest.Mock).mockResolvedValue({});

			await payment.cancel({ id, requestOptions });

			expect(mockConfig.options).toEqual(expect.objectContaining(requestOptions));
		});
	});
});