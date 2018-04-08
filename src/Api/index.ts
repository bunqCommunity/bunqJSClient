import ApiAdapter from "../ApiAdapter";
import AttachementContent from "./AttachementContent";
import BunqMeTabs from "./BunqMeTabs";
import Card from "./Card";
import CustomerStatementExport from "./CustomStatementExport";
import CustomerStatementExportContent from "./CustomStatementExportContent";
import DeviceRegistration from "./DeviceRegistration";
import DraftPayment from "./DraftPayment";
import Installation from "./Installation";
import MasterCardAction from "./MasterCardAction";
import MonetaryAccount from "./MonetaryAccount";
import MonetaryAccountBank from "./MonetaryAccountBank";
import Payment from "./Payment";
import PaymentBatch from "./PaymentBatch";
import RequestInquiry from "./RequestInquiry";
import RequestInquiryBatch from "./RequestInquiryBatch";
import RequestResponse from "./RequestResponse";
import SandboxUser from "./SandboxUser";
import SessionServer from "./SessionServer";
import User from "./User";
import CardCvc2 from "./CardCvc2";
import SchedulePayment from "./SchedulePayment";
import SchedulePaymentBatch from "./SchedulePaymentBatch";

export default (ApiAdapter: ApiAdapter) => {
    return {
        attachmentContent: new AttachementContent(ApiAdapter),
        bunqMeTabs: new BunqMeTabs(ApiAdapter),
        card: new Card(ApiAdapter),
        cardCvc2: new CardCvc2(ApiAdapter),
        customerStatementExport: new CustomerStatementExport(ApiAdapter),
        customerStatementExportContent: new CustomerStatementExportContent(
            ApiAdapter
        ),
        deviceRegistration: new DeviceRegistration(ApiAdapter),
        draftPayment: new DraftPayment(ApiAdapter),
        installation: new Installation(ApiAdapter),
        masterCardAction: new MasterCardAction(ApiAdapter),
        monetaryAccount: new MonetaryAccount(ApiAdapter),
        monetaryAccountBank: new MonetaryAccountBank(ApiAdapter),
        payment: new Payment(ApiAdapter),
        paymentBatch: new PaymentBatch(ApiAdapter),
        requestInquiry: new RequestInquiry(ApiAdapter),
        requestInquiryBatch: new RequestInquiryBatch(ApiAdapter),
        requestResponse: new RequestResponse(ApiAdapter),
        sessionServer: new SessionServer(ApiAdapter),
        sandboxUser: new SandboxUser(ApiAdapter),
        schedulePayment: new SchedulePayment(ApiAdapter),
        schedulePaymentBatch: new SchedulePaymentBatch(ApiAdapter),
        user: new User(ApiAdapter)
    };
};
