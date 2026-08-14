import { Refund } from '.';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';

jest.mock('@utils/restClient');

describe('Refund client', () => {
  let refundClient: Refund;
  let config: MercadoPagoConfig;

  beforeEach(() => {
    config = new MercadoPagoConfig({ accessToken: 'test_access_token' });
    refundClient = new Refund(config);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('refund', () => {
    test('should create a full refund when amount is not provided', async () => {
      const payment_id = 123456789;
      const mockResponse = {
        id: 1001,
        payment_id,
        amount: 100.00,
        status: 'approved'
      };

      const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

      const result = await refundClient.refund({ payment_id });

      expect(spyFetch).toHaveBeenCalledWith(
        `/v1/payments/${payment_id}/refunds`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer test_access_token'
          },
          body: JSON.stringify({})
        })
      );
      expect(result).toEqual(mockResponse);
    });

    test('should create a partial refund when amount is provided', async () => {
      const payment_id = 123456789;
      const amount = 25.50;
      const mockResponse = {
        id: 1002,
        payment_id,
        amount,
        status: 'approved'
      };

      const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

      const result = await refundClient.refund({ payment_id, amount });

      expect(spyFetch).toHaveBeenCalledWith(
        `/v1/payments/${payment_id}/refunds`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer test_access_token'
          },
          body: JSON.stringify({ amount })
        })
      );
      expect(result).toEqual(mockResponse);
    });

    test('should pass request options to RestClient.fetch', async () => {
      const payment_id = 123456789;
      const requestOptions = { timeout: 10000 };
      const mockResponse = {
        id: 1003,
        payment_id,
        amount: 50.00,
        status: 'approved'
      };

      const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

      await refundClient.refund({ payment_id, requestOptions });

      expect(spyFetch).toHaveBeenCalledWith(
        `/v1/payments/${payment_id}/refunds`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer test_access_token'
          },
          body: JSON.stringify({}),
          timeout: 10000
        })
      );
    });

    test('should handle amount of 0', async () => {
      const payment_id = 123456789;
      const amount = 0;
      const mockResponse = {
        id: 1004,
        payment_id,
        amount,
        status: 'approved'
      };

      const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

      const result = await refundClient.refund({ payment_id, amount });

      expect(spyFetch).toHaveBeenCalledWith(
        `/v1/payments/${payment_id}/refunds`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer test_access_token'
          },
          body: JSON.stringify({ amount: 0 })
        })
      );
      expect(result).toEqual(mockResponse);
    });

    test('should merge request options with config options', async () => {
      const configWithOptions = new MercadoPagoConfig({ 
        accessToken: 'test_access_token',
        options: { timeout: 5000 }
      });
      const refundClientWithOptions = new Refund(configWithOptions);
      
      const payment_id = 123456789;
      const requestOptions = { timeout: 10000 };
      const mockResponse = {
        id: 1005,
        payment_id,
        amount: 75.00,
        status: 'approved'
      };

      const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(mockResponse);

      await refundClientWithOptions.refund({ payment_id, requestOptions });

      expect(spyFetch).toHaveBeenCalledWith(
        `/v1/payments/${payment_id}/refunds`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer test_access_token'
          },
          body: JSON.stringify({}),
          timeout: 10000
        })
      );
    });
  });
});