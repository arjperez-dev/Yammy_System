import { Discount } from "../domain/discount";
import { PaymentError } from "../domain/errors";
import { Payment } from "../domain/payment";
import { Result } from "../domain/result";
import { DiscountComposer, DiscountSummary } from "./discount-composer";
import { PaymentValidator } from "./payment-validator";

export interface ProcessedPayment {
    readonly paymentId: string;
    readonly originalAmount: number;
    readonly totalDiscount: number;
    readonly finalAmount: number;
    readonly paymentMethod: string;
}

export class PaymentProcessor {
    public constructor(
        private readonly validator: PaymentValidator,
        private readonly discountComposer: DiscountComposer,
    ) {}

    public process(
        payment: Payment,
        discounts: readonly Discount[],
    ): Result<ProcessedPayment, PaymentError> {
        return this.validator
            .validate(payment)
            .flatMap((validatedPayment) =>
                this.discountComposer.applyDiscounts(validatedPayment, discounts),
            )
            .map((summary: DiscountSummary) => ({
                paymentId: payment.id,
                originalAmount: summary.originalAmount,
                totalDiscount: summary.totalDiscount,
                finalAmount: summary.finalAmount,
                paymentMethod: payment.paymentMethod,
            }));
    }
}
