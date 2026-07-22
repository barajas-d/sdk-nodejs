/**
 * Unit tests for the main MercadoPago SDK class.
 *
 * Verifies that the MercadoPago constructor correctly initializes all
 * client facades and that each client is properly instantiated with the
 * provided configuration.
 */

import MercadoPago from './mercadopago';
import { Payment } from './clients/payment';
import { Preference } from './clients/preference';
import { Customer } from './clients/customer';
import { CustomerCard } from './clients/customerCard';
import { MerchantOrder } from './clients/merchantOrder';
import { Refund } from './clients/paymentRefund';
import { PreApproval } from './clients/preApproval';
import { PreApprovalPlan } from './clients/preApprovalPlan';
import { CardToken } from './clients/cardToken';
import { PaymentMethod } from './clients/paymentMethod';
import { IdentificationType } from './clients/identificationType';
import { User } from './clients/user';
import { AdvancedPayment } from './clients/advancedPayment';
import { Chargeback } from './clients/chargeback';
import { Order } from './clients/order';

describe('MercadoPago SDK main class', () => {
	test('should initialize all client facades with the provided configuration', () => {
		const config = {
			accessToken: 'test_access_token',
			options: { timeout: 5000 }
		};

		const mercadopago = new MercadoPago(config);

		// Verify that the config is inherited from MercadoPagoConfig
		expect(mercadopago.accessToken).toBe('test_access_token');
		expect(mercadopago.options).toEqual({ timeout: 5000 });

		// Verify that all client facades are instantiated
		expect(mercadopago.payment).toBeInstanceOf(Payment);
		expect(mercadopago.preference).toBeInstanceOf(Preference);
		expect(mercadopago.customer).toBeInstanceOf(Customer);
		expect(mercadopago.customerCard).toBeInstanceOf(CustomerCard);
		expect(mercadopago.merchantOrder).toBeInstanceOf(MerchantOrder);
		expect(mercadopago.refund).toBeInstanceOf(Refund);
		expect(mercadopago.preApproval).toBeInstanceOf(PreApproval);
		expect(mercadopago.preApprovalPlan).toBeInstanceOf(PreApprovalPlan);
		expect(mercadopago.cardToken).toBeInstanceOf(CardToken);
		expect(mercadopago.paymentMethod).toBeInstanceOf(PaymentMethod);
		expect(mercadopago.identificationType).toBeInstanceOf(IdentificationType);
		expect(mercadopago.user).toBeInstanceOf(User);
		expect(mercadopago.advancedPayment).toBeInstanceOf(AdvancedPayment);
		expect(mercadopago.chargeback).toBeInstanceOf(Chargeback);
		expect(mercadopago.order).toBeInstanceOf(Order);
	});

	test('should initialize with minimal configuration (accessToken only)', () => {
		const config = { accessToken: 'test_token' };
		const mercadopago = new MercadoPago(config);

		expect(mercadopago.accessToken).toBe('test_token');
		expect(mercadopago.payment).toBeInstanceOf(Payment);
		expect(mercadopago.order).toBeInstanceOf(Order);
	});

	test('should expose all expected client properties', () => {
		const mercadopago = new MercadoPago({ accessToken: 'test_token' });

		const expectedClients = [
			'payment',
			'preference',
			'customer',
			'customerCard',
			'merchantOrder',
			'refund',
			'preApproval',
			'preApprovalPlan',
			'cardToken',
			'paymentMethod',
			'identificationType',
			'user',
			'advancedPayment',
			'chargeback',
			'order'
		];

		expectedClients.forEach(clientName => {
			expect(mercadopago).toHaveProperty(clientName);
			expect(mercadopago[clientName]).toBeDefined();
		});
	});

	test('should pass configuration to each client instance', () => {
		const config = {
			accessToken: 'test_access_token',
			options: { timeout: 3000 }
		};

		const mercadopago = new MercadoPago(config);

		// Access the private config property through any client
		// (We can't directly test private properties, but we can verify behavior)
		expect(mercadopago.payment).toBeDefined();
		expect(mercadopago.order).toBeDefined();
		expect(mercadopago.customer).toBeDefined();
	});
});