import deleteCustomerAddress from '.';

import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('CustomerAddress.deleteCustomerAddress', () => {
	test('deletes an address using encoded customer and address IDs without a body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const response = { api_response: { status: 200, headers: [] } };
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(response);

		const result = await deleteCustomerAddress({ customerId: 'customer/1', addressId: 'address/2', config });

		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/customers/customer%2F1/addresses/address%2F2',
			{
				method: 'DELETE',
				headers: { Authorization: 'Bearer token' }
			}
		);
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(result.api_response.status).toBe(200);
		expect(result).toEqual(response);
	});
});