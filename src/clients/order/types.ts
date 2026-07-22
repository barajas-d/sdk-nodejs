/**
 * Shared domain types for the Order client.
 *
 * Contains response type definitions for various order operations
 * including refunds, cancellations, captures, and general order responses.
 *
 * @module order/types
 */

/**
 * Response for a refund operation on an order (201).
 *
 * Returned by the refund endpoint after successfully initiating
 * a partial or full refund for an order's payment transactions.
 */
export declare type OrderRefundResponse = {
  /** Unique order identifier. */
  id?: string;
  /** Current status of the order after the refund operation. */
  status?: string;
  /** Detailed status information about the order state. */
  status_detail?: string;
  /** Transaction details including refund information. */
  transactions?: {
    /** Array of refund transaction records. */
    refunds?: Array<{
      /** Unique refund transaction identifier. */
      id?: string;
      /** Amount refunded in this transaction. */
      amount?: string;
      /** Refund transaction status. */
      status?: string;
      /** Detailed status information about the refund. */
      status_detail?: string;
      /** ISO 8601 timestamp when the refund was created. */
      date_created?: string;
    }>;
    /** Array of payment transaction records (for context). */
    payments?: Array<{
      /** Unique payment transaction identifier. */
      id?: string;
      /** Payment amount. */
      amount?: string;
      /** Payment status. */
      status?: string;
      /** Detailed payment status information. */
      status_detail?: string;
    }>;
  };
};