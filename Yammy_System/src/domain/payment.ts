export type PaymentMethod = "credit_card" | "debit_card" | "cash" | "transfer";

export interface PaymentProps {
    readonly id: string;
    readonly amount: number;
    readonly isVip: boolean;
    readonly couponAmount: number;
    readonly paymentMethod: PaymentMethod;
}

export class Payment {
    public readonly id: string;
    public readonly amount: number;
    public readonly isVip: boolean;
    public readonly couponAmount: number;
    public readonly paymentMethod: PaymentMethod;

    public constructor(props: PaymentProps) {
        this.id = props.id;
        this.amount = props.amount;
        this.isVip = props.isVip;
        this.couponAmount = props.couponAmount;
        this.paymentMethod = props.paymentMethod;
    }
}
