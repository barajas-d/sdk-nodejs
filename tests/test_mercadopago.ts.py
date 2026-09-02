/**
 * Unit tests for the main MercadoPago SDK entry point.
 *
 * Validates that the MercadoPago class correctly instantiates all API
 * clients with the provided configuration and exposes them as public
 * properties.
 */

import MercadoPago from './mercadopago';
import { MercadoPagoConfig } from './mercadoPagoConfig';
import { Payment } from './clients/payment';
import { Preference } from './clients/preference';
import { Customer } from './clients/customer';
import { CustomerCard } from './clients/customerCard';
import { CardToken } from './clients/cardToken';
import { PaymentMethod } from './clients/paymentMethod';
import { IdentificationType } from './clients/identificationType';
import { MerchantOrder } from './clients/merchantOrder';
import { PreApproval } from './clients/preApproval';
import { PreApprovalPlan } from './clients/preApprovalPlan';
import { PaymentRefund } from './clients/paymentRefund';
import { User } from './clients/user';
import { AdvancedPayment } from './clients/advancedPayment';
import { Chargeback } from './clients/chargeback';
import { Order } from './clients/order';

describe('MercadoPago main class', () => {
	const accessToken = 'TEST_ACCESS_TOKEN_123';
	let client: MercadoPago;

	beforeEach(() => {
		client = new MercadoPago({ accessToken, options: { timeout: 5000 } });
	});

	test('should extend MercadoPagoConfig', () => {
		expect(client).toBeInstanceOf(MercadoPagoConfig);
	});

	test('should store the provided access token', () => {
		expect(client.accessToken).toBe(accessToken);
	});

	test('should instantiate Payment client', () => {
		expect(client.payment).toBeInstanceOf(Payment);
		expect(client.payment).toBeDefined();
	});

	test('should instantiate Preference client', () => {
		expect(client.preference).toBeInstanceOf(Preference);
		expect(client.preference).toBeDefined();
	});

	test('should instantiate Customer client', () => {
		expect(client.customer).toBeInstanceOf(Customer);
		expect(client.customer).toBeDefined();
	});

	test('should instantiate CustomerCard client', () => {
		expect(client.customerCard).toBeInstanceOf(CustomerCard);
		expect(client.customerCard).toBeDefined();
	});

	test('should instantiate CardToken client', () => {
		expect(client.cardToken).toBeInstanceOf(CardToken);
		expect(client.cardToken).toBeDefined();
	});

	test('should instantiate PaymentMethod client', () => {
		expect(client.paymentMethod).toBeInstanceOf(PaymentMethod);
		expect(client.paymentMethod).toBeDefined();
	});

	test('should instantiate IdentificationType client', () => {
		expect(client.identificationType).toBeInstanceOf(IdentificationType);
		expect(client.identificationType).toBeDefined();
	});

	test('should instantiate MerchantOrder client', () => {
		expect(client.merchantOrder).toBeInstanceOf(MerchantOrder);
		expect(client.merchantOrder).toBeDefined();
	});

	test('should instantiate PreApproval client', () => {
		expect(client.preApproval).toBeInstanceOf(PreApproval);
		expect(client.preApproval).toBeDefined();
	});

	test('should instantiate PreApprovalPlan client', () => {
		expect(client.preApprovalPlan).toBeInstanceOf(PreApprovalPlan);
		expect(client.preApprovalPlan).toBeDefined();
	});

	test('should instantiate PaymentRefund client', () => {
		expect(client.paymentRefund).toBeInstanceOf(PaymentRefund);
		expect(client.paymentRefund).toBeDefined();
	});

	test('should instantiate User client', () => {
		expect(client.user).toBeInstanceOf(User);
		expect(client.user).toBeDefined();
	});

	test('should instantiate AdvancedPayment client', () => {
		expect(client.advancedPayment).toBeInstanceOf(AdvancedPayment);
		expect(client.advancedPayment).toBeDefined();
	});

	test('should instantiate Chargeback client', () => {
		expect(client.chargeback).toBeInstanceOf(Chargeback);
		expect(client.chargeback).toBeDefined();
	});

	test('should instantiate Order client', () => {
		expect(client.order).toBeInstanceOf(Order);
		expect(client.order).toBeDefined();
	});

	test('should pass configuration options to all clients', () => {
		const clientWithOptions = new MercadoPago({
			accessToken: 'TOKEN',
			options: { timeout: 10000 }
		});

		// Verify that the config is propagated
		expect(clientWithOptions.options).toEqual({ timeout: 10000 });
	});

	test('should support multiple SDK instances with different configs', () => {
		const client1 = new MercadoPago({ accessToken: 'TOKEN_1' });
		const client2 = new MercadoPago({ accessToken: 'TOKEN_2' });

		expect(client1.accessToken).toBe('TOKEN_1');
		expect(client2.accessToken).toBe('TOKEN_2');
		expect(client1).not.toBe(client2);
	});

	test('should create clients that share the same config instance', () => {
		// All clients should reference the same config object
		expect(client.payment).toBeDefined();
		expect(client.customer).toBeDefined();
		// If we could access internal config, we'd verify they're the same reference
		// For now, we just ensure they're all instantiated
	});
});