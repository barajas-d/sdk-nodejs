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
	let preference: Preference;
	let config: MercadoPagoConfig;

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

			const mockResponse = {
				id: 'pref-123',
				items: body.items
			};

			(create as jest.Mock).mockResolvedValue(mockResponse);

			const result = await preference.create({ body });

			expect(create).toHaveBeenCalledWith({ body, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options', async () => {
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
			const requestOptions = { timeout: 3000 };

			(create as jest.Mock).mockResolvedValue({});

			await preference.create({ body, requestOptions });

			expect(config.options).toEqual(requestOptions);
		});
	});

	describe('get', () => {
		test('should call get with correct parameters', async () => {
			const preferenceId = 'pref-123';
			const mockResponse = {
				id: preferenceId,
				items: []
			};

			(get as jest.Mock).mockResolvedValue(mockResponse);

			const result = await preference.get({ preferenceId });

			expect(get).toHaveBeenCalledWith({ preferenceId, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options', async () => {
			const preferenceId = 'pref-123';
			const requestOptions = { timeout: 3000 };

			(get as jest.Mock).mockResolvedValue({});

			await preference.get({ preferenceId, requestOptions });

			expect(config.options).toEqual(requestOptions);
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

			const mockResponse = {
				id,
				items: updatePreferenceRequest.items
			};

			(update as jest.Mock).mockResolvedValue(mockResponse);

			const result = await preference.update({ id, updatePreferenceRequest });

			expect(update).toHaveBeenCalledWith({ id, updatePreferenceRequest, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options', async () => {
			const id = 'pref-123';
			const updatePreferenceRequest = {
				items: []
			};
			const requestOptions = { timeout: 3000 };

			(update as jest.Mock).mockResolvedValue({});

			await preference.update({ id, updatePreferenceRequest, requestOptions });

			expect(config.options).toEqual(requestOptions);
		});
	});

	describe('search', () => {
		test('should call search with correct parameters', async () => {
			const options = { limit: 10, offset: 0 };
			const mockResponse = {
				results: [],
				paging: { total: 0, limit: 10, offset: 0 }
			};

			(search as jest.Mock).mockResolvedValue(mockResponse);

			const result = await preference.search({ options });

			expect(search).toHaveBeenCalledWith({ options, config });
			expect(result).toEqual(mockResponse);
		});

		test('should call search without options', async () => {
			const mockResponse = {
				results: [],
				paging: { total: 0, limit: 10, offset: 0 }
			};

			(search as jest.Mock).mockResolvedValue(mockResponse);

			const result = await preference.search();

			expect(search).toHaveBeenCalledWith({ options: undefined, config });
			expect(result).toEqual(mockResponse);
		});

		test('should merge request options', async () => {
			const requestOptions = { timeout: 3000 };

			(search as jest.Mock).mockResolvedValue({});

			await preference.search({ requestOptions });

			expect(config.options).toEqual(requestOptions);
		});
	});
});