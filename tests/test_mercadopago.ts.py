import MercadoPago from './mercadopago';
import { MercadoPagoConfig } from './mercadoPagoConfig';
import { AdvancedPayment } from './clients/advancedPayment';
import { CardToken } from './clients/cardToken';
import { Chargeback } from './clients/chargeback';
import { Customer } from './clients/customer';
import { CustomerCard } from './clients/customerCard';
import { IdentificationType } from './clients/identificationType';
import { MerchantOrder } from './clients/merchantOrder';
import { Order } from './clients/order';
import { Payment } from './clients/payment';
import { PaymentMethod } from './clients/paymentMethod';
import { PaymentRefund } from './clients/paymentRefund';
import { PreApproval } from './clients/preApproval';
import { PreApprovalPlan } from './clients/preApprovalPlan';
import { Preference } from './clients/preference';
import { Refund } from './clients/refund';
import { User } from './clients/user';

jest.mock('./mercadoPagoConfig');

describe('MercadoPago main class', () => {
	const accessToken = 'TEST_ACCESS_TOKEN';
	const options = { timeout: 5000 };

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should initialize with accessToken and options', () => {
		const client = new MercadoPago({ accessToken, options });

		expect(client.accessToken).toBe(accessToken);
		expect(client.options).toEqual(options);
	});

	test('should initialize with accessToken only', () => {
		const client = new MercadoPago({ accessToken });

		expect(client.accessToken).toBe(accessToken);
		expect(client.options).toBeUndefined();
	});

	test('should create MercadoPagoConfig instance with provided credentials', () => {
		new MercadoPago({ accessToken, options });

		expect(MercadoPagoConfig).toHaveBeenCalledWith({ accessToken, options });
	});

	test('should instantiate all API client properties', () => {
		const client = new MercadoPago({ accessToken });

		expect(client.advancedPayment).toBeInstanceOf(AdvancedPayment);
		expect(client.cardToken).toBeInstanceOf(CardToken);
		expect(client.chargeback).toBeInstanceOf(Chargeback);
		expect(client.customer).toBeInstanceOf(Customer);
		expect(client.customerCard).toBeInstanceOf(CustomerCard);
		expect(client.identificationType).toBeInstanceOf(IdentificationType);
		expect(client.merchantOrder).toBeInstanceOf(MerchantOrder);
		expect(client.order).toBeInstanceOf(Order);
		expect(client.payment).toBeInstanceOf(Payment);
		expect(client.paymentMethod).toBeInstanceOf(PaymentMethod);
		expect(client.paymentRefund).toBeInstanceOf(PaymentRefund);
		expect(client.preApproval).toBeInstanceOf(PreApproval);
		expect(client.preApprovalPlan).toBeInstanceOf(PreApprovalPlan);
		expect(client.preference).toBeInstanceOf(Preference);
		expect(client.refund).toBeInstanceOf(Refund);
		expect(client.user).toBeInstanceOf(User);
	});

	test('should expose refund client through the main class', () => {
		const client = new MercadoPago({ accessToken });

		expect(client.refund).toBeDefined();
		expect(client.refund).toBeInstanceOf(Refund);
	});

	test('should pass the same MercadoPagoConfig instance to all clients', () => {
		const mockConfigInstance = { accessToken, options };
		(MercadoPagoConfig as jest.Mock).mockReturnValue(mockConfigInstance);

		new MercadoPago({ accessToken, options });

		expect(AdvancedPayment).toHaveBeenCalledWith(mockConfigInstance);
		expect(CardToken).toHaveBeenCalledWith(mockConfigInstance);
		expect(Chargeback).toHaveBeenCalledWith(mockConfigInstance);
		expect(Customer).toHaveBeenCalledWith(mockConfigInstance);
		expect(CustomerCard).toHaveBeenCalledWith(mockConfigInstance);
		expect(IdentificationType).toHaveBeenCalledWith(mockConfigInstance);
		expect(MerchantOrder).toHaveBeenCalledWith(mockConfigInstance);
		expect(Order).toHaveBeenCalledWith(mockConfigInstance);
		expect(Payment).toHaveBeenCalledWith(mockConfigInstance);
		expect(PaymentMethod).toHaveBeenCalledWith(mockConfigInstance);
		expect(PaymentRefund).toHaveBeenCalledWith(mockConfigInstance);
		expect(PreApproval).toHaveBeenCalledWith(mockConfigInstance);
		expect(PreApprovalPlan).toHaveBeenCalledWith(mockConfigInstance);
		expect(Preference).toHaveBeenCalledWith(mockConfigInstance);
		expect(Refund).toHaveBeenCalledWith(mockConfigInstance);
		expect(User).toHaveBeenCalledWith(mockConfigInstance);
	});

	test('should allow access to the raw accessToken property', () => {
		const client = new MercadoPago({ accessToken });

		expect(client.accessToken).toBe(accessToken);
		expect(typeof client.accessToken).toBe('string');
	});

	test('should allow access to the options property', () => {
		const client = new MercadoPago({ accessToken, options });

		expect(client.options).toEqual(options);
		expect(client.options?.timeout).toBe(5000);
	});
});