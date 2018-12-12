import AssignmentType from "./AssignmentType";

export type PinCodeAssignment = {
    type: AssignmentType;
    pin_code: string;
    monetary_account_id: number;
};

export default PinCodeAssignment;
