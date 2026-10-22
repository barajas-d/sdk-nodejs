import updateCustomerAddress from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing customer address, updateCustomerAddress', () => {
	test('should send an encoded PUT with an Address body and return the mocked response', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const body = { street_name: 'Rua Nova', zip_code: '12345' };
		const response = { ...body, api_response: { status: 200, headers: [] as [string, string[]] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await updateCustomerAddress({ customerId: 'customer/1', addressId: 'address 2', body, config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/customers/customer%2F1/addresses/address%202', {
			method: 'PUT',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(body),
			timeout: 5000
		});
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});