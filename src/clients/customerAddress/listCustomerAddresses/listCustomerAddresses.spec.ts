import listCustomerAddresses from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('CustomerAddress.listCustomerAddresses', () => {
	test('sends a GET request with encoded customer ID and no body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const addresses = [{ zip_code: '01310-100', street_name: 'Av. Paulista', street_number: '1000', city: 'São Paulo', state: 'SP', country: 'BR' }];
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(addresses);

		const response = await listCustomerAddresses({ customerId: 'customer/123', config });

		expect(spyFetch).toHaveBeenCalledWith('/v1/customers/customer%2F123/addresses', {
			method: 'GET',
			headers: { Authorization: 'Bearer token' },
			timeout: 5000
		});
		expect(response).toEqual(addresses);
	});
});