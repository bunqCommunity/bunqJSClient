"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AttachementContent_1 = require("./AttachementContent");
const BunqMeTabs_1 = require("./BunqMeTabs");
const Card_1 = require("./Card");
const CardCvc2_1 = require("./CardCvc2");
const CustomerStatementExport_1 = require("./CustomerStatementExport");
const CustomerStatementExportContent_1 = require("./CustomerStatementExportContent");
const DeviceRegistration_1 = require("./DeviceRegistration");
const DraftPayment_1 = require("./DraftPayment");
const Installation_1 = require("./Installation");
const MasterCardAction_1 = require("./MasterCardAction");
const MonetaryAccount_1 = require("./MonetaryAccount");
const MonetaryAccountBank_1 = require("./MonetaryAccountBank");
const Payment_1 = require("./Payment");
const PaymentBatch_1 = require("./PaymentBatch");
const RequestInquiry_1 = require("./RequestInquiry");
const RequestInquiryBatch_1 = require("./RequestInquiryBatch");
const RequestResponse_1 = require("./RequestResponse");
const SandboxUser_1 = require("./SandboxUser");
const Schedule_1 = require("./Schedule");
const SchedulePayment_1 = require("./SchedulePayment");
const SchedulePaymentBatch_1 = require("./SchedulePaymentBatch");
const ShareInviteBankInquiry_1 = require("./ShareInviteBankInquiry");
const ShareInviteBankResponse_1 = require("./ShareInviteBankResponse");
const SessionServer_1 = require("./SessionServer");
const User_1 = require("./User");
const UserCompany_1 = require("./UserCompany");
const UserPerson_1 = require("./UserPerson");
exports.default = (ApiAdapter) => {
    return {
        attachmentContent: new AttachementContent_1.default(ApiAdapter),
        bunqMeTabs: new BunqMeTabs_1.default(ApiAdapter),
        card: new Card_1.default(ApiAdapter),
        cardCvc2: new CardCvc2_1.default(ApiAdapter),
        customerStatementExport: new CustomerStatementExport_1.default(ApiAdapter),
        customerStatementExportContent: new CustomerStatementExportContent_1.default(ApiAdapter),
        deviceRegistration: new DeviceRegistration_1.default(ApiAdapter),
        draftPayment: new DraftPayment_1.default(ApiAdapter),
        installation: new Installation_1.default(ApiAdapter),
        masterCardAction: new MasterCardAction_1.default(ApiAdapter),
        monetaryAccount: new MonetaryAccount_1.default(ApiAdapter),
        monetaryAccountBank: new MonetaryAccountBank_1.default(ApiAdapter),
        payment: new Payment_1.default(ApiAdapter),
        paymentBatch: new PaymentBatch_1.default(ApiAdapter),
        requestInquiry: new RequestInquiry_1.default(ApiAdapter),
        requestInquiryBatch: new RequestInquiryBatch_1.default(ApiAdapter),
        requestResponse: new RequestResponse_1.default(ApiAdapter),
        sessionServer: new SessionServer_1.default(ApiAdapter),
        sandboxUser: new SandboxUser_1.default(ApiAdapter),
        schedule: new Schedule_1.default(ApiAdapter),
        schedulePayment: new SchedulePayment_1.default(ApiAdapter),
        schedulePaymentBatch: new SchedulePaymentBatch_1.default(ApiAdapter),
        shareInviteBankInquiry: new ShareInviteBankInquiry_1.default(ApiAdapter),
        shareInviteBankResponse: new ShareInviteBankResponse_1.default(ApiAdapter),
        user: new User_1.default(ApiAdapter),
        userCompany: new UserCompany_1.default(ApiAdapter),
        userPerson: new UserPerson_1.default(ApiAdapter)
    };
};
