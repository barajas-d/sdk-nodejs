import createPos from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('POS createPos', () => {
	test('sends a JSON POST to /pos and returns the created POS', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const body = { name: 'Main POS', store_id: '1234567', external_id: 'POS001', fixed_amount: false };
		const response = {
			id: 123,
			qr_code: 'qr-data',
			qr_code_image: 'qr-image',
			api_response: { status: 201, headers: [] }
		};
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await createPos({ body, config });

		expect(spyFetch).toHaveBeenCalledWith('/pos', expect.objectContaining({
			method: 'POST',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(body)
		}));
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(201);
	});
});