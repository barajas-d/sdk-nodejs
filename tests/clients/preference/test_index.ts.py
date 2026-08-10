import { Preference } from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import create from './create';
import get from './get';
import search from './search';
import update from './update';

jest.mock('./create');
jest.mock('./get');
jest.mock('./search');
jest.mock('./update');

describe('Preference', () => {
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
						id: '1234',
						title: 'Test Product',
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
			const body = {
				items: [
					{
						id: '1234',
						title: 'Test Product',
						quantity: 1,
						unit_price: 100
					}
				]
			};
			const requestOptions = { idempotency: 'key-123' };

			await preference.create({ body, requestOptions });

			expect(create).toHaveBeenCalledWith({
				body,
				config: expect.objectContaining({
					options: { timeout: 3000, idempotency: 'key-123' }
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

		test('should merge request options with config options', async () => {
			config.options = { timeout: 3000 };
			const preferenceId = 'pref-123';
			const requestOptions = { idempotency: 'key-123' };

			await preference.get({ preferenceId, requestOptions });

			expect(get).toHaveBeenCalledWith({
				preferenceId,
				config: expect.objectContaining({
					options: { timeout: 3000, idempotency: 'key-123' }
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
						id: '5678',
						title: 'Updated Product',
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

		test('should merge request options with config options', async () => {
			config.options = { timeout: 3000 };
			const id = 'pref-123';
			const updatePreferenceRequest = {
				items: [
					{
						id: '5678',
						title: 'Updated Product',
						quantity: 2,
						unit_price: 200
					}
				]
			};
			const requestOptions = { idempotency: 'key-123' };

			await preference.update({ id, updatePreferenceRequest, requestOptions });

			expect(update).toHaveBeenCalledWith({
				id,
				updatePreferenceRequest,
				config: expect.objectContaining({
					options: { timeout: 3000, idempotency: 'key-123' }
				})
			});
		});
	});

	describe('search', () => {
		test('should call search with correct parameters', async () => {
			const options = { sponsor_id: 12345 };
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

		test('should call search without options', async () => {
			await preference.search();

			expect(search).toHaveBeenCalledWith({
				options: undefined,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
		});

		test('should merge request options with config options', async () => {
			config.options = { timeout: 3000 };
			const options = { sponsor_id: 12345 };
			const requestOptions = { idempotency: 'key-123' };

			await preference.search({ options, requestOptions });

			expect(search).toHaveBeenCalledWith({
				options,
				config: expect.objectContaining({
					options: { timeout: 3000, idempotency: 'key-123' }
				})
			});
		});
	});
});