/**
 * Unit tests for the main MercadoPago SDK class.
 *
 * @module mercadopago.spec
 */

import MercadoPago from './mercadopago';
import { Payment } from './clients/payment';
import { PaymentMethod } from './clients/paymentMethod';
import { PaymentRefund } from './clients/paymentRefund';
import { MerchantOrder } from './clients/merchantOrder';
import { PreApproval } from './clients/preApproval';
import { PreApprovalPlan } from './clients/preApprovalPlan';
import { Preference } from './clients/preference';
import { Customer } from './clients/customer';
import { CustomerCard } from './clients/customerCard';
import { CardToken } from './clients/cardToken';
import { IdentificationType } from './clients/identificationType';
import { User } from './clients/user';
import { Order } from './clients/order';
import { Refund } from './clients/refund';
import { AdvancedPayment } from './clients/advancedPayment';
import { Chargeback } from './clients/chargeback';

describe('MercadoPago', () => {
	describe('constructor', () => {
		test('should initialize with access token', () => {
			const client = new MercadoPago({ accessToken: 'test_token' });
			expect(client.accessToken).toBe('test_token');
		});

		test('should initialize with access token and options', () => {
			const client = new MercadoPago({
				accessToken: 'test_token',
				options: { timeout: 5000 }
			});
			expect(client.accessToken).toBe('test_token');
			expect(client.options).toEqual({ timeout: 5000 });
		});

		test('should initialize all resource clients', () => {
			const client = new MercadoPago({ accessToken: 'test_token' });
			
			expect(client.payment).toBeInstanceOf(Payment);
			expect(client.paymentMethod).toBeInstanceOf(PaymentMethod);
			expect(client.paymentRefund).toBeInstanceOf(PaymentRefund);
			expect(client.merchantOrder).toBeInstanceOf(MerchantOrder);
			expect(client.preApproval).toBeInstanceOf(PreApproval);
			expect(client.preApprovalPlan).toBeInstanceOf(PreApprovalPlan);
			expect(client.preference).toBeInstanceOf(Preference);
			expect(client.customer).toBeInstanceOf(Customer);
			expect(client.customerCard).toBeInstanceOf(CustomerCard);
			expect(client.cardToken).toBeInstanceOf(CardToken);
			expect(client.identificationType).toBeInstanceOf(IdentificationType);
			expect(client.user).toBeInstanceOf(User);
			expect(client.order).toBeInstanceOf(Order);
			expect(client.refund).toBeInstanceOf(Refund);
			expect(client.advancedPayment).toBeInstanceOf(AdvancedPayment);
			expect(client.chargeback).toBeInstanceOf(Chargeback);
		});

		test('should pass configuration to all resource clients', () => {
			const client = new MercadoPago({
				accessToken: 'test_token',
				options: { timeout: 3000 }
			});

			// Verify that resource clients have access to the config
			expect(client.payment['config']).toBeDefined();
			expect(client.payment['config'].accessToken).toBe('test_token');
			expect(client.payment['config'].options).toEqual({ timeout: 3000 });
		});
	});

	describe('resource client accessibility', () => {
		let client: MercadoPago;

		beforeEach(() => {
			client = new MercadoPago({ accessToken: 'test_token' });
		});

		test('should provide access to payment client', () => {
			expect(client.payment).toBeDefined();
			expect(typeof client.payment.create).toBe('function');
			expect(typeof client.payment.get).toBe('function');
			expect(typeof client.payment.search).toBe('function');
			expect(typeof client.payment.capture).toBe('function');
			expect(typeof client.payment.cancel).toBe('function');
		});

		test('should provide access to refund client', () => {
			expect(client.refund).toBeDefined();
			expect(typeof client.refund.create).toBe('function');
		});

		test('should provide access to order client', () => {
			expect(client.order).toBeDefined();
			expect(typeof client.order.create).toBe('function');
			expect(typeof client.order.get).toBe('function');
			expect(typeof client.order.process).toBe('function');
			expect(typeof client.order.refund).toBe('function');
			expect(typeof client.order.cancel).toBe('function');
			expect(typeof client.order.capture).toBe('function');
		});

		test('should provide access to customer client', () => {
			expect(client.customer).toBeDefined();
			expect(typeof client.customer.create).toBe('function');
			expect(typeof client.customer.get).toBe('function');
			expect(typeof client.customer.update).toBe('function');
			expect(typeof client.customer.remove).toBe('function');
			expect(typeof client.customer.search).toBe('function');
		});

		test('should provide access to preference client', () => {
			expect(client.preference).toBeDefined();
			expect(typeof client.preference.create).toBe('function');
			expect(typeof client.preference.get).toBe('function');
			expect(typeof client.preference.update).toBe('function');
			expect(typeof client.preference.search).toBe('function');
		});

		test('should provide access to advanced payment client', () => {
			expect(client.advancedPayment).toBeDefined();
			expect(typeof client.advancedPayment.create).toBe('function');
			expect(typeof client.advancedPayment.get).toBe('function');
			expect(typeof client.advancedPayment.search).toBe('function');
			expect(typeof client.advancedPayment.update).toBe('function');
			expect(typeof client.advancedPayment.cancel).toBe('function');
			expect(typeof client.advancedPayment.capture).toBe('function');
		});

		test('should provide access to chargeback client', () => {
			expect(client.chargeback).toBeDefined();
			expect(typeof client.chargeback.get).toBe('function');
			expect(typeof client.chargeback.search).toBe('function');
		});
	});

	describe('configuration inheritance', () => {
		test('should inherit MercadoPagoConfig properties', () => {
			const client = new MercadoPago({
				accessToken: 'test_token',
				options: { timeout: 5000 }
			});

			// MercadoPago extends MercadoPagoConfig
			expect(client.accessToken).toBe('test_token');
			expect(client.options).toEqual({ timeout: 5000 });
		});

		test('should allow options to be undefined', () => {
			const client = new MercadoPago({ accessToken: 'test_token' });
			expect(client.options).toBeUndefined();
		});
	});

	describe('real-world usage patterns', () => {
		test('should support payment workflow', () => {
			const client = new MercadoPago({ accessToken: 'test_token' });
			
			// Check that payment methods are available
			expect(client.payment).toBeDefined();
			expect(client.paymentRefund).toBeDefined();
			expect(client.paymentMethod).toBeDefined();
		});

		test('should support customer and card workflow', () => {
			const client = new MercadoPago({ accessToken: 'test_token' });
			
			// Check that customer-related methods are available
			expect(client.customer).toBeDefined();
			expect(client.customerCard).toBeDefined();
			expect(client.cardToken).toBeDefined();
		});

		test('should support order and refund workflow', () => {
			const client = new MercadoPago({ accessToken: 'test_token' });
			
			// Check that order-related methods are available
			expect(client.order).toBeDefined();
			expect(client.refund).toBeDefined();
		});

		test('should support subscription workflow', () => {
			const client = new MercadoPago({ accessToken: 'test_token' });
			
			// Check that subscription-related methods are available
			expect(client.preApproval).toBeDefined();
			expect(client.preApprovalPlan).toBeDefined();
		});

		test('should support marketplace workflow', () => {
			const client = new MercadoPago({ accessToken: 'test_token' });
			
			// Check that marketplace-related methods are available
			expect(client.advancedPayment).toBeDefined();
			expect(client.merchantOrder).toBeDefined();
		});
	});
});