import CounterpartyAlias from "./CounterpartyAlias";
import Amount from "./Amount";

type PaymentRequestObject = {
    description: string;
    amount: Amount;
    counterpartyAlias: CounterpartyAlias;
    attachment?: any[];
    merchant_reference?: string;
    allow_bunqto?: boolean;
};

export default PaymentRequestObject;
