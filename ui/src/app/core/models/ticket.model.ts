export enum TicketStatus {
    NotReady = 'NotReady',
    Ready = 'Ready',
    Assigned = 'Assigned',
    Done = 'Done',
}

export interface TicketRejection {
    reason: string;
    details: number;
}

export interface Ticket {
    _id: string;
    name: string;
    price: number;
    priority: number;
    description: string;
    itMust: string[];
    status: TicketStatus;
    rejections?: TicketRejection[];
}
