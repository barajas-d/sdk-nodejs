import { Preference } from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import create from './create';
import get from './get';
import update from './update';
import search from './search';

jest.mock('./create');
jest.mock('./get');
jest.mock('./update');
jest.mock('./search');

describe('Preference client', () => {
	let preference: Preference;
	let config: MercadoPagoConfig;

	beforeEach(() => {
		config = new MercadoPagoConfig({ accessToken: 'test-token' });
		preference = new Preference(config);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		test('should call create with correct parameters', async () => {
			const body = {
				items: [
					{
						id: '1',
						title: 'Test Item',
						quantity: 1,
						unit_price: 100
					}
				]
			};
			const requestOptions = { timeout: 5000 };

			await preference.create({ body, requestOptions });

			expect(create).toHaveBeenCalledWith({
				body,
				config: expect.objectContaining({
					accessToken: 'test-token',
					options: requestOptions
				})
			});
		});

		test('should merge request options with config options', async () => {
			config.options = { timeout: 3000 };
			preference = new Preference(config);

			const body = {
				items: [
					{
						id: '1',
						title: 'Test Item',
						quantity: 1,
						unit_price: 100
					}
				]
			};
			const requestOptions = { idempotency: 'key123' };

			await preference.create({ body, requestOptions });

			expect(create).toHaveBeenCalledWith({
				body,
				config: expect.objectContaining({
					options: expect.objectContaining({
						timeout: 3000,
						idempotency: 'key123'
					})
				})
			});
		});
	});

	describe('get', () => {
		test('should call get with correct parameters', async () => {
			const preferenceId = 'pref-123';
			const requestOptions = { timeout: 5000 };

			await preference.get({ preferenceId, requestOptions });

			expect(get).toHaveBeenCalledWith({
				preferenceId,
				config: expect.objectContaining({
					accessToken: 'test-token',
					options: requestOptions
				})
			});
		});
	});

	describe('update', () => {
		test('should call update with correct parameters', async () => {
			const id = 'pref-123';
			const updatePreferenceRequest = {
				items: [
					{
						id: '1',
						title: 'Updated Item',
						quantity: 2,
						unit_price: 200
					}
				]
			};
			const requestOptions = { timeout: 5000 };

			await preference.update({ id, updatePreferenceRequest, requestOptions });

			expect(update).toHaveBeenCalledWith({
				id,
				updatePreferenceRequest,
				config: expect.objectContaining({
					accessToken: 'test-token',
					options: requestOptions
				})
			});
		});
	});

	describe('search', () => {
		test('should call search with correct parameters', async () => {
			const options = { external_reference: 'order-123' };
			const requestOptions = { timeout: 5000 };

			await preference.search({ options, requestOptions });

			expect(search).toHaveBeenCalledWith({
				options,
				config: expect.objectContaining({
					accessToken: 'test-token',
					options: requestOptions
				})
			});
		});

		test('should call search with empty options when not provided', async () => {
			await preference.search();

			expect(search).toHaveBeenCalledWith({
				options: undefined,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
		});

		test('should call search with options only', async () => {
			const options = { limit: 10 };

			await preference.search({ options });

			expect(search).toHaveBeenCalledWith({
				options,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
		});
	});
});