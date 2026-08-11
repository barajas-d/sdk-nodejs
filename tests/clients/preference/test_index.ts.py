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

describe('Preference Client', () => {
	let config: MercadoPagoConfig;
	let preference: Preference;

	beforeEach(() => {
		config = new MercadoPagoConfig({ accessToken: 'test_token' });
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
					accessToken: 'test_token',
					options: requestOptions
				})
			});
		});

		test('should merge request options with config options', async () => {
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
			config.options = { timeout: 3000 };
			const requestOptions = { timeout: 5000 };

			await preference.create({ body, requestOptions });

			expect(create).toHaveBeenCalledWith({
				body,
				config: expect.objectContaining({
					options: requestOptions
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
					accessToken: 'test_token',
					options: requestOptions
				})
			});
		});

		test('should work without request options', async () => {
			const preferenceId = 'pref-123';

			await preference.get({ preferenceId });

			expect(get).toHaveBeenCalledWith({
				preferenceId,
				config: expect.objectContaining({
					accessToken: 'test_token'
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
					accessToken: 'test_token',
					options: requestOptions
				})
			});
		});

		test('should work without request options', async () => {
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

			await preference.update({ id, updatePreferenceRequest });

			expect(update).toHaveBeenCalledWith({
				id,
				updatePreferenceRequest,
				config: expect.objectContaining({
					accessToken: 'test_token'
				})
			});
		});
	});

	describe('search', () => {
		test('should call search with correct parameters', async () => {
			const options = { limit: 10, offset: 0 };
			const requestOptions = { timeout: 5000 };

			await preference.search({ options, requestOptions });

			expect(search).toHaveBeenCalledWith({
				options,
				config: expect.objectContaining({
					accessToken: 'test_token',
					options: requestOptions
				})
			});
		});

		test('should work with empty search options', async () => {
			await preference.search();

			expect(search).toHaveBeenCalledWith({
				options: undefined,
				config: expect.objectContaining({
					accessToken: 'test_token'
				})
			});
		});

		test('should work without request options', async () => {
			const options = { limit: 10, offset: 0 };

			await preference.search({ options });

			expect(search).toHaveBeenCalledWith({
				options,
				config: expect.objectContaining({
					accessToken: 'test_token'
				})
			});
		});
	});
});