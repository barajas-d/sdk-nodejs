import updateChargeback from '.';
import { Chargeback } from '..';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing chargeback, updateChargeback', () => {
	test('sends PUT documentation to an encoded chargeback path and accepts an empty response', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const body = { files: [{ description: 'Invoice', name: 'invoice.pdf', url: 'https://example.com/invoice.pdf' }] };
		const response = { api_response: { status: 200, headers: {} } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await updateChargeback({ id: 'CB/001', body, config: client });

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/chargebacks/CB%2F001',
			expect.objectContaining({
				method: 'PUT',
				headers: { 'Authorization': 'Bearer token' },
				body: JSON.stringify(body)
			})
		);
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});

	test('exposes updateChargeback on Chargeback with request options', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const body = { files: [{ description: 'Proof', name: 'proof.pdf', url: 'https://example.com/proof.pdf' }] };
		const response = { api_response: { status: 200, headers: {} } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await new Chargeback(client).updateChargeback({
			id: 'CB 002', body, requestOptions: { timeout: 5000 }
		});

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/chargebacks/CB%20002',
			expect.objectContaining({
				method: 'PUT',
				headers: { 'Authorization': 'Bearer token' },
				body: JSON.stringify(body),
				timeout: 5000
			})
		);
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});