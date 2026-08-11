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
						unit_price: 100,
					},
				],
			};

			const expectedResponse = {
				id: 'pref_123',
				items: body.items,
			};

			(create as jest.Mock).mockResolvedValue(expectedResponse);

			const result = await preference.create({ body });

			expect(create).toHaveBeenCalledWith({
				body,
				config,
			});
			expect(result).toEqual(expectedResponse);
		});

		test('should merge request options with config options', async () => {
			const body = { items: [] };
			const requestOptions = { timeout: 5000 };

			await preference.create({ body, requestOptions });

			expect(config.options).toEqual(requestOptions);
		});
	});

	describe('get', () => {
		test('should call get with correct parameters', async () => {
			const preferenceId = 'pref_123';
			const expectedResponse = {
				id: preferenceId,
				items: [],
			};

			(get as jest.Mock).mockResolvedValue(expectedResponse);

			const result = await preference.get({ preferenceId });

			expect(get).toHaveBeenCalledWith({
				preferenceId,
				config,
			});
			expect(result).toEqual(expectedResponse);
		});

		test('should merge request options with config options', async () => {
			const preferenceId = 'pref_123';
			const requestOptions = { timeout: 3000 };

			await preference.get({ preferenceId, requestOptions });

			expect(config.options).toEqual(requestOptions);
		});
	});

	describe('update', () => {
		test('should call update with correct parameters', async () => {
			const id = 'pref_123';
			const updatePreferenceRequest = {
				items: [
					{
						id: '1',
						title: 'Updated Item',
						quantity: 2,
						unit_price: 200,
					},
				],
			};

			const expectedResponse = {
				id,
				items: updatePreferenceRequest.items,
			};

			(update as jest.Mock).mockResolvedValue(expectedResponse);

			const result = await preference.update({ id, updatePreferenceRequest });

			expect(update).toHaveBeenCalledWith({
				id,
				updatePreferenceRequest,
				config,
			});
			expect(result).toEqual(expectedResponse);
		});

		test('should merge request options with config options', async () => {
			const id = 'pref_123';
			const updatePreferenceRequest = { items: [] };
			const requestOptions = { timeout: 4000 };

			await preference.update({ id, updatePreferenceRequest, requestOptions });

			expect(config.options).toEqual(requestOptions);
		});
	});

	describe('search', () => {
		test('should call search with correct parameters', async () => {
			const options = {
				sponsor_id: 12345,
			};

			const expectedResponse = {
				elements: [],
				next_offset: 0,
				total: 0,
			};

			(search as jest.Mock).mockResolvedValue(expectedResponse);

			const result = await preference.search({ options });

			expect(search).toHaveBeenCalledWith({
				options,
				config,
			});
			expect(result).toEqual(expectedResponse);
		});

		test('should call search without options', async () => {
			const expectedResponse = {
				elements: [],
				next_offset: 0,
				total: 0,
			};

			(search as jest.Mock).mockResolvedValue(expectedResponse);

			const result = await preference.search();

			expect(search).toHaveBeenCalledWith({
				options: undefined,
				config,
			});
			expect(result).toEqual(expectedResponse);
		});

		test('should merge request options with config options', async () => {
			const options = { sponsor_id: 12345 };
			const requestOptions = { timeout: 6000 };

			await preference.search({ options, requestOptions });

			expect(config.options).toEqual(requestOptions);
		});
	});
});