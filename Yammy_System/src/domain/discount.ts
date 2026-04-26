export interface DiscountContext {
    readonly amount: number;
    readonly isVip: boolean;
}

export interface Discount {
    calculateDiscount(context: DiscountContext): number;
}

export class VipDiscount implements Discount {
    public calculateDiscount(context: DiscountContext): number {
        return context.isVip ? context.amount * 0.1 : 0;
    }
}

export class BlackFridayDiscount implements Discount {
    public calculateDiscount(context: DiscountContext): number {
        return context.amount * 0.2;
    }
}

export class FixedCouponDiscount implements Discount {
    public constructor(private readonly couponAmount: number) {}

    public calculateDiscount(context: DiscountContext): number {
        return Math.min(this.couponAmount, context.amount);
    }
}

export class LargeOrderDiscount implements Discount {
    public constructor(
        private readonly minimumAmount: number,
        private readonly discountAmount: number,
    ) {}

    public calculateDiscount(context: DiscountContext): number {
        return context.amount >= this.minimumAmount ? this.discountAmount : 0;
    }
}
