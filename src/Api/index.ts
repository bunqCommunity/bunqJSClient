import AttachmentContent from "./AttachmentContent";
import AttachmentPublic from "./AttachmentPublic";
import Avatar from "./Avatar";
import BillingContractSubscription from "./BillingContractSubscription";
import BunqMeTabs from "./BunqMeTabs";
import Card from "./Card";
import CardBatch from "./CardBatch";
import CardCvc2 from "./CardCvc2";
import CardDebit from "./CardDebit";
import CardName from "./CardName";
import CredentialPasswordIp from "./CredentialPasswordIp";
import CustomerStatementExport from "./CustomerStatementExport";
import CustomerStatementExportContent from "./CustomerStatementExportContent";
import DeviceRegistration from "./DeviceRegistration";
import DraftPayment from "./DraftPayment";
import Event from "./Event";
import Installation from "./Installation";
import Invoice from "./Invoice";
import Ip from "./Ip";
import MasterCardAction from "./MasterCardAction";
import MonetaryAccount from "./MonetaryAccount";
import MonetaryAccountBank from "./MonetaryAccountBank";
import MonetaryAccountJoint from "./MonetaryAccountJoint";
import MonetaryAccountSavings from "./MonetaryAccountSavings";
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
import SessionServer from "./SessionServer";
import ShareInviteMonetaryAccountInquiry from "./ShareInviteMonetaryAccountInquiry";
import ShareInviteMonetaryAccountResponse from "./ShareInviteMonetaryAccountResponse";
import User from "./User";
import UserCompany from "./UserCompany";
import UserPerson from "./UserPerson";

export default bunqJSClient => ({
    attachmentContent: new AttachmentContent(bunqJSClient.ApiAdapter),
    attachmentPublic: new AttachmentPublic(bunqJSClient.ApiAdapter),
    avatar: new Avatar(bunqJSClient.ApiAdapter),
    billingContractSubscription: new BillingContractSubscription(bunqJSClient.ApiAdapter),
    bunqMeTabs: new BunqMeTabs(bunqJSClient.ApiAdapter),
    card: new Card(bunqJSClient.ApiAdapter),
    cardBatch: new CardBatch(bunqJSClient.ApiAdapter),
    cardCvc2: new CardCvc2(bunqJSClient.ApiAdapter),
    cardDebit: new CardDebit(bunqJSClient.ApiAdapter),
    cardName: new CardName(bunqJSClient.ApiAdapter),
    credentialPasswordIp: new CredentialPasswordIp(bunqJSClient.ApiAdapter),
    customerStatementExport: new CustomerStatementExport(bunqJSClient.ApiAdapter),
    customerStatementExportContent: new CustomerStatementExportContent(bunqJSClient.ApiAdapter),
    deviceRegistration: new DeviceRegistration(bunqJSClient.ApiAdapter),
    draftPayment: new DraftPayment(bunqJSClient.ApiAdapter),
    event: new Event(bunqJSClient.ApiAdapter),
    installation: new Installation(bunqJSClient.ApiAdapter),
    invoice: new Invoice(bunqJSClient.ApiAdapter),
    ip: new Ip(bunqJSClient.ApiAdapter),
    masterCardAction: new MasterCardAction(bunqJSClient.ApiAdapter),
    monetaryAccount: new MonetaryAccount(bunqJSClient.ApiAdapter),
    monetaryAccountBank: new MonetaryAccountBank(bunqJSClient.ApiAdapter),
    monetaryAccountJoint: new MonetaryAccountJoint(bunqJSClient.ApiAdapter),
    monetaryAccountSavings: new MonetaryAccountSavings(bunqJSClient.ApiAdapter),
    noteAttachment: new NoteAttachment(bunqJSClient.ApiAdapter),
    noteText: new NoteText(bunqJSClient.ApiAdapter),
    payment: new Payment(bunqJSClient.ApiAdapter),
    paymentBatch: new PaymentBatch(bunqJSClient.ApiAdapter),
    requestInquiry: new RequestInquiry(bunqJSClient.ApiAdapter),
    requestInquiryBatch: new RequestInquiryBatch(bunqJSClient.ApiAdapter),
    requestResponse: new RequestResponse(bunqJSClient.ApiAdapter),
    sandboxUser: new SandboxUser(bunqJSClient.ApiAdapter),
    schedule: new Schedule(bunqJSClient.ApiAdapter),
    schedulePayment: new SchedulePayment(bunqJSClient.ApiAdapter),
    schedulePaymentBatch: new SchedulePaymentBatch(bunqJSClient.ApiAdapter),
    sessionServer: new SessionServer(bunqJSClient.ApiAdapter),
    shareInviteMonetaryAccountInquiry: new ShareInviteMonetaryAccountInquiry(bunqJSClient.ApiAdapter),
    shareInviteMonetaryAccountResponse: new ShareInviteMonetaryAccountResponse(bunqJSClient.ApiAdapter),
    user: new User(bunqJSClient.ApiAdapter),
    userCompany: new UserCompany(bunqJSClient.ApiAdapter),
    userPerson: new UserPerson(bunqJSClient.ApiAdapter)
});
