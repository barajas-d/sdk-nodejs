import updateChargeback from '.';
import { Chargeback } from '@src/clients/chargeback';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Chargeback updateChargeback', () => {
	test('sends PUT to the chargeback path with JSON documentation and returns the response', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const body = {
			files: [{ name: 'receipt', description: 'Purchase receipt', url: 'https://example.com/receipt' }],
		};
		const response = {};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await updateChargeback({ id: 'CB-001', body, config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/chargebacks/CB-001',
			expect.objectContaining({
				method: 'PUT',
				headers: { Authorization: 'Bearer token' },
				body: JSON.stringify(body),
			})
		);
		expect(result).toEqual(response);
	});

	test('exposes updateChargeback through the Chargeback facade', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const client = new Chargeback(config);
		const body = {
			files: [{ name: 'document', description: 'Supporting document', url: 'https://example.com/document' }],
		};
		const response = {};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await client.updateChargeback({ id: 'CB-002', body });

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/chargebacks/CB-002',
			expect.objectContaining({
				method: 'PUT',
				headers: { Authorization: 'Bearer token' },
				body: JSON.stringify(body),
			})
		);
		expect(result).toEqual(response);
	});

	test('encodes a chargeback ID when submitting documentation', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const body = {
			files: [{ name: 'receipt', description: 'Purchase receipt', url: 'https://example.com/receipt' }],
		};
		const response = {};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await updateChargeback({ id: 'CB/001', body, config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/chargebacks/CB%2F001',
			expect.objectContaining({
				method: 'PUT',
				headers: { Authorization: 'Bearer token' },
				body: JSON.stringify(body),
			})
		);
		expect(result).toEqual(response);
	});

	test('forwards per-request options through the Chargeback facade', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const client = new Chargeback(config);
		const body = {
			files: [{ name: 'receipt', description: 'Purchase receipt', url: 'https://example.com/receipt' }],
		};
		const requestOptions = { timeout: 1234 };
		const response = {};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await client.updateChargeback({ id: 'CB-003', body, requestOptions });

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/chargebacks/CB-003',
			expect.objectContaining({
				method: 'PUT',
				headers: { Authorization: 'Bearer token' },
				body: JSON.stringify(body),
				timeout: requestOptions.timeout,
			})
		);
		expect(result).toEqual(response);
	});
});
