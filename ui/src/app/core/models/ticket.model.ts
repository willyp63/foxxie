export enum TicketStatus {
    Unassigned = 0,
    Assigned = 1,
    Done = 2,
}

export interface Ticket {
    _id: string;
    price: number;
    priority: number;
    description: string;
    itMust: string[];
    status: TicketStatus;
}
