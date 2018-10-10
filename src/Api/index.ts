import ApiAdapter from "../ApiAdapter";
import AttachementContent from "./AttachementContent";
import BunqMeTabs from "./BunqMeTabs";
import Card from "./Card";
import CardCvc2 from "./CardCvc2";
import CustomerStatementExport from "./CustomerStatementExport";
import CustomerStatementExportContent from "./CustomerStatementExportContent";
import DeviceRegistration from "./DeviceRegistration";
import DraftPayment from "./DraftPayment";
import Installation from "./Installation";
import MasterCardAction from "./MasterCardAction";
import MonetaryAccount from "./MonetaryAccount";
import MonetaryAccountBank from "./MonetaryAccountBank";
import NoteAttachment from "./NoteAttachment";
import NoteText from "./NoteText";
import Payment from "./Payment";
import PaymentBatch from "./PaymentBatch";
import RequestInquiry from "./RequestInquiry";
import RequestInquiryBatch from "./RequestInquiryBatch";
import RequestResponse from "./RequestResponse";
import SandboxUser from "./SandboxUser";
import Schedule from "./Schedule";
import SchedulePayment from "./SchedulePayment";
import SchedulePaymentBatch from "./SchedulePaymentBatch";
import ShareInviteBankInquiry from "./ShareInviteBankInquiry";
import ShareInviteBankResponse from "./ShareInviteBankResponse";
import SessionServer from "./SessionServer";
import User from "./User";
import UserCompany from "./UserCompany";
import UserPerson from "./UserPerson";

export default (ApiAdapter: ApiAdapter) => {
    return {
        attachmentContent: new AttachementContent(ApiAdapter),
        bunqMeTabs: new BunqMeTabs(ApiAdapter),
        card: new Card(ApiAdapter),
        cardCvc2: new CardCvc2(ApiAdapter),
        customerStatementExport: new CustomerStatementExport(ApiAdapter),
        customerStatementExportContent: new CustomerStatementExportContent(ApiAdapter),
        deviceRegistration: new DeviceRegistration(ApiAdapter),
        draftPayment: new DraftPayment(ApiAdapter),
        installation: new Installation(ApiAdapter),
        masterCardAction: new MasterCardAction(ApiAdapter),
        monetaryAccount: new MonetaryAccount(ApiAdapter),
        monetaryAccountBank: new MonetaryAccountBank(ApiAdapter),
        noteText: new NoteText(ApiAdapter),
        noteAttachment: new NoteAttachment(ApiAdapter),
        payment: new Payment(ApiAdapter),
        paymentBatch: new PaymentBatch(ApiAdapter),
        requestInquiry: new RequestInquiry(ApiAdapter),
        requestInquiryBatch: new RequestInquiryBatch(ApiAdapter),
        requestResponse: new RequestResponse(ApiAdapter),
        sessionServer: new SessionServer(ApiAdapter),
        sandboxUser: new SandboxUser(ApiAdapter),
        schedule: new Schedule(ApiAdapter),
        schedulePayment: new SchedulePayment(ApiAdapter),
        schedulePaymentBatch: new SchedulePaymentBatch(ApiAdapter),
        shareInviteBankInquiry: new ShareInviteBankInquiry(ApiAdapter),
        shareInviteBankResponse: new ShareInviteBankResponse(ApiAdapter),
        user: new User(ApiAdapter),
        userCompany: new UserCompany(ApiAdapter),
        userPerson: new UserPerson(ApiAdapter)
    };
};
