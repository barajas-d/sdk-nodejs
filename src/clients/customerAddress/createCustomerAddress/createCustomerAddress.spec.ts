import createCustomerAddress from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing customer addresses, createCustomerAddress', () => {
	test('sends JSON address to the encoded customer path and returns the created address', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const body = {
			zip_code: '01310-100',
			street_name: 'Av. Paulista',
			street_number: '1000',
			city: 'São Paulo',
			state: 'SP',
			country: 'BR'
		};
		const response = { ...body, id: 'address-1', api_response: { status: 201, headers: [] as [string, string[]] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await createCustomerAddress({ customerId: 'customer/1', body, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/customers/customer%2F1/addresses', {
			method: 'POST',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(body),
			timeout: 5000
		});
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(201);
	});
});