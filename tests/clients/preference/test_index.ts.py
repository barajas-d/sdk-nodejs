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
	const mockConfig = new MercadoPagoConfig({ accessToken: 'test-token' });
	let preference: Preference;

	beforeEach(() => {
		preference = new Preference(mockConfig);
		jest.clearAllMocks();
	});

	describe('create', () => {
		test('should call create with correct parameters', async () => {
			const body = {
				items: [{
					id: '1',
					title: 'Test Product',
					quantity: 1,
					unit_price: 100
				}]
			};
			const requestOptions = { timeout: 5000 };

			await preference.create({ body, requestOptions });

			expect(create).toHaveBeenCalledWith({
				body,
				config: expect.objectContaining({
					accessToken: 'test-token',
					options: expect.objectContaining({ timeout: 5000 })
				})
			});
		});

		test('should merge request options with config options', async () => {
			const body = {
				items: [{
					id: '1',
					title: 'Test Product',
					quantity: 1,
					unit_price: 100
				}]
			};

			await preference.create({ body, requestOptions: { timeout: 3000 } });

			expect(create).toHaveBeenCalledWith({
				body,
				config: expect.objectContaining({
					options: expect.objectContaining({ timeout: 3000 })
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
					options: expect.objectContaining({ timeout: 5000 })
				})
			});
		});

		test('should work without request options', async () => {
			const preferenceId = 'pref-123';

			await preference.get({ preferenceId });

			expect(get).toHaveBeenCalledWith({
				preferenceId,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
		});
	});

	describe('update', () => {
		test('should call update with correct parameters', async () => {
			const id = 'pref-123';
			const updatePreferenceRequest = {
				items: [{
					id: '1',
					title: 'Updated Product',
					quantity: 2,
					unit_price: 200
				}]
			};
			const requestOptions = { timeout: 5000 };

			await preference.update({ id, updatePreferenceRequest, requestOptions });

			expect(update).toHaveBeenCalledWith({
				id,
				updatePreferenceRequest,
				config: expect.objectContaining({
					accessToken: 'test-token',
					options: expect.objectContaining({ timeout: 5000 })
				})
			});
		});

		test('should merge request options with config options', async () => {
			const id = 'pref-123';
			const updatePreferenceRequest = {
				items: [{
					id: '1',
					title: 'Updated Product',
					quantity: 1,
					unit_price: 100
				}]
			};

			await preference.update({ id, updatePreferenceRequest, requestOptions: { timeout: 3000 } });

			expect(update).toHaveBeenCalledWith({
				id,
				updatePreferenceRequest,
				config: expect.objectContaining({
					options: expect.objectContaining({ timeout: 3000 })
				})
			});
		});
	});

	describe('search', () => {
		test('should call search with correct parameters', async () => {
			const options = { external_reference: 'test-ref' };
			const requestOptions = { timeout: 5000 };

			await preference.search({ options, requestOptions });

			expect(search).toHaveBeenCalledWith({
				options,
				config: expect.objectContaining({
					accessToken: 'test-token',
					options: expect.objectContaining({ timeout: 5000 })
				})
			});
		});

		test('should work without any options', async () => {
			await preference.search();

			expect(search).toHaveBeenCalledWith({
				options: undefined,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
		});

		test('should work with only search options', async () => {
			const options = { status: 'active' };

			await preference.search({ options });

			expect(search).toHaveBeenCalledWith({
				options,
				config: expect.objectContaining({
					accessToken: 'test-token'
				})
			});
		});

		test('should merge request options with config options', async () => {
			const options = { external_reference: 'test-ref' };

			await preference.search({ options, requestOptions: { timeout: 3000 } });

			expect(search).toHaveBeenCalledWith({
				options,
				config: expect.objectContaining({
					options: expect.objectContaining({ timeout: 3000 })
				})
			});
		});
	});
});