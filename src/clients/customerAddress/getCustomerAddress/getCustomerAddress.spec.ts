import getCustomerAddress from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('CustomerAddress.getCustomerAddress', () => {
	test('gets an address using encoded customer and address IDs without a body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const response = { zip_code: '12345', api_response: { status: 200, headers: [] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await getCustomerAddress({ customerId: 'customer/one', addressId: 'address two', config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/customers/customer%2Fone/addresses/address%20two',
			{
				method: 'GET',
				headers: { Authorization: 'Bearer token' },
				timeout: 5000
			}
		);
		expect(result).toEqual(response);
		expect(result.api_response.status).toBe(200);
	});
});