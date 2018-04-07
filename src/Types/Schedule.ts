export type RecurrenceUnit = "ONCE"|"HOURLY"|"DAILY"|"WEEKLY"|"MONTHLY"|"YEARLY";

type Schedule = {
    time_start: string;
    time_end?: string;
    recurrence_unit: RecurrenceUnit;
    recurrence_size: number;
};

export default Schedule;
