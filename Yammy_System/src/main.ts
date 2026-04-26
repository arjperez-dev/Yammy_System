import {
    BlackFridayDiscount,
    Discount,
    FixedCouponDiscount,
    LargeOrderDiscount,
    VipDiscount,
} from "./domain/discount";
import { Payment } from "./domain/payment";
import { DiscountComposer } from "./services/discount-composer";
import { PaymentProcessor } from "./services/payment-processor";
import { PaymentValidator } from "./services/payment-validator";

const payment = new Payment({
    id: "PAY-001",
    amount: 200,
    isVip: true,
    couponAmount: 15,
    paymentMethod: "credit_card",
});

const discounts: readonly Discount[] = [
    new VipDiscount(),
    new BlackFridayDiscount(),
    new FixedCouponDiscount(payment.couponAmount),
    new LargeOrderDiscount(150, 25),
];

const validator = new PaymentValidator();
const discountComposer = new DiscountComposer();
const paymentProcessor = new PaymentProcessor(validator, discountComposer);

const result = paymentProcessor.process(payment, discounts);

if (result.isSuccess) {
    console.log("Processed payment successfully:");
    console.log(result.value);
} else {
    console.log("Payment processing failed:");
    console.log(result.error);
}
