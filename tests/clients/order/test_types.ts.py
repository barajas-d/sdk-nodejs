/**
 * Unit tests for Order type definitions.
 *
 * Validates that the OrderRefundResponse type structure is correct
 * and can be properly assigned.
 */

import type { OrderRefundResponse } from './types';

describe('Order types', () => {
	describe('OrderRefundResponse', () => {
		test('should accept a valid refund response structure', () => {
			const response: OrderRefundResponse = {
				id: 'order_123',
				status: 'refunded',
				status_detail: 'refunded',
				transactions: {
					refunds: [
						{
							id: 'refund_456',
							amount: '25.00',
							status: 'processed',
							status_detail: 'refund_processed',
							date_created: '2025-01-15T10:30:00.000Z'
						}
					],
					payments: [
						{
							id: 'payment_789',
							amount: '200.00',
							status: 'processed',
							status_detail: 'accredited'
						}
					]
				}
			};

			expect(response.id).toBe('order_123');
			expect(response.status).toBe('refunded');
			expect(response.status_detail).toBe('refunded');
			expect(response.transactions?.refunds?.[0].amount).toBe('25.00');
			expect(response.transactions?.payments?.[0].amount).toBe('200.00');
		});

		test('should accept a response with only required fields', () => {
			const response: OrderRefundResponse = {};

			expect(response.id).toBeUndefined();
			expect(response.status).toBeUndefined();
			expect(response.transactions).toBeUndefined();
		});

		test('should accept a response with refunds but no payments', () => {
			const response: OrderRefundResponse = {
				id: 'order_123',
				status: 'processed',
				status_detail: 'partially_refunded',
				transactions: {
					refunds: [
						{
							id: 'refund_001',
							amount: '50.00',
							status: 'processed'
						}
					]
				}
			};

			expect(response.transactions?.refunds).toHaveLength(1);
			expect(response.transactions?.payments).toBeUndefined();
		});

		test('should accept multiple refund transactions', () => {
			const response: OrderRefundResponse = {
				id: 'order_123',
				status: 'refunded',
				transactions: {
					refunds: [
						{
							id: 'refund_001',
							amount: '25.00',
							status: 'processed'
						},
						{
							id: 'refund_002',
							amount: '75.00',
							status: 'processed'
						}
					]
				}
			};

			expect(response.transactions?.refunds).toHaveLength(2);
			expect(response.transactions?.refunds?.[0].amount).toBe('25.00');
			expect(response.transactions?.refunds?.[1].amount).toBe('75.00');
		});
	});
});