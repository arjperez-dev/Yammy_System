import { Discount, DiscountContext } from "../domain/discount";
import { PaymentError } from "../domain/errors";
import { Payment } from "../domain/payment";
import { Result, fail, ok } from "../domain/result";

export interface DiscountSummary {
    readonly originalAmount: number;
    readonly totalDiscount: number;
    readonly finalAmount: number;
}

export class DiscountComposer {
    public applyDiscounts(
        payment: Payment,
        discounts: readonly Discount[],
    ): Result<DiscountSummary, PaymentError> {
        const context: DiscountContext = {
            amount: payment.amount,
            isVip: payment.isVip,
        };

        let totalDiscount = 0;

        for (const discount of discounts) {
            const currentDiscount = discount.calculateDiscount(context);

            if (currentDiscount < 0) {
                return fail({
                    type: "INVALID_DISCOUNT",
                    message: "Discount value cannot be negative.",
                });
            }

            totalDiscount += currentDiscount;
        }

        const boundedDiscount = Math.min(totalDiscount, payment.amount);
        const finalAmount = payment.amount - boundedDiscount;

        return ok({
            originalAmount: payment.amount,
            totalDiscount: boundedDiscount,
            finalAmount,
        });
    }
}
