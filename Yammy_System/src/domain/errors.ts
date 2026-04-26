export type PaymentError =
    | {
          readonly type: "INVALID_AMOUNT";
          readonly message: string;
      }
    | {
          readonly type: "INVALID_COUPON";
          readonly message: string;
      }
    | {
          readonly type: "UNSUPPORTED_PAYMENT_METHOD";
          readonly message: string;
      }
    | {
          readonly type: "INVALID_DISCOUNT";
          readonly message: string;
      };
