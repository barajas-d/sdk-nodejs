/**
 * Unit tests for the main MercadoPago class.
 *
 * Verifies that all API clients are correctly instantiated and exposed
 * when the main class is constructed with valid configuration.
 */

import MercadoPago from './mercadopago';
import { Payment } from './clients/payment';
import { Preference } from './clients/preference';
import { PreApproval } from './clients/preApproval';
import { PreApprovalPlan } from './clients/preApprovalPlan';
import { Customer } from './clients/customer';
import { CustomerCard } from './clients/customerCard';
import { CardToken } from './clients/cardToken';
import { PaymentMethod } from './clients/paymentMethod';
import { MerchantOrder } from './clients/merchantOrder';
import { PaymentRefund } from './clients/paymentRefund';
import { IdentificationType } from './clients/identificationType';
import { User } from './clients/user';
import { AdvancedPayment } from './clients/advancedPayment';
import { Chargeback } from './clients/chargeback';
import { Order } from './clients/order';

describe('MercadoPago class', () => {
	test('should instantiate with access token and options', () => {
		const client = new MercadoPago({
			accessToken: 'test_access_token',
			options: { timeout: 5000 }
		});

		expect(client.accessToken).toBe('test_access_token');
		expect(client.options).toEqual({ timeout: 5000 });
	});

	test('should instantiate all API clients', () => {
		const client = new MercadoPago({ accessToken: 'test_token' });

		expect(client.payment).toBeInstanceOf(Payment);
		expect(client.preference).toBeInstanceOf(Preference);
		expect(client.preApproval).toBeInstanceOf(PreApproval);
		expect(client.preApprovalPlan).toBeInstanceOf(PreApprovalPlan);
		expect(client.customer).toBeInstanceOf(Customer);
		expect(client.customerCard).toBeInstanceOf(CustomerCard);
		expect(client.cardToken).toBeInstanceOf(CardToken);
		expect(client.paymentMethod).toBeInstanceOf(PaymentMethod);
		expect(client.merchantOrder).toBeInstanceOf(MerchantOrder);
		expect(client.paymentRefund).toBeInstanceOf(PaymentRefund);
		expect(client.identificationType).toBeInstanceOf(IdentificationType);
		expect(client.user).toBeInstanceOf(User);
		expect(client.advancedPayment).toBeInstanceOf(AdvancedPayment);
		expect(client.chargeback).toBeInstanceOf(Chargeback);
		expect(client.order).toBeInstanceOf(Order);
	});

	test('should expose Order client following the same pattern as Payment and Preference', () => {
		const client = new MercadoPago({ accessToken: 'test_token' });

		expect(client.order).toBeDefined();
		expect(client.order).toBeInstanceOf(Order);
		expect(typeof client.order.create).toBe('function');
		expect(typeof client.order.get).toBe('function');
	});

	test('should pass configuration to all clients', () => {
		const client = new MercadoPago({
			accessToken: 'test_token',
			options: { timeout: 10000 }
		});

		// Verify that clients have access to the config
		expect(client.payment).toHaveProperty('config');
		expect(client.preference).toHaveProperty('config');
		expect(client.order).toHaveProperty('config');
	});

	test('should work without options parameter', () => {
		const client = new MercadoPago({ accessToken: 'test_token' });

		expect(client.accessToken).toBe('test_token');
		expect(client.order).toBeInstanceOf(Order);
	});
});