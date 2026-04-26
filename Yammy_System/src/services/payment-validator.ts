import { PaymentError } from "../domain/errors";
import { Payment } from "../domain/payment";
import { Result, fail, ok } from "../domain/result";

export class PaymentValidator {
    public validate(payment: Payment): Result<Payment, PaymentError> {
        if (payment.amount <= 0) {
            return fail({
                type: "INVALID_AMOUNT",
                message: "Payment amount must be greater than zero.",
            });
        }

        if (payment.couponAmount < 0) {
            return fail({
                type: "INVALID_COUPON",
                message: "Coupon amount cannot be negative.",
            });
        }

        return ok(payment);
    }
}
