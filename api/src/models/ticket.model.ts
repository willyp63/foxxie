import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

import { MongoDoc } from './mongo-doc.model';

export enum TicketStatus {
    NotReady = 'NotReady',
    Ready = 'Ready',
    Assigned = 'Assigned',
    Done = 'Done',
}

export class TicketRejection {
    @Expose()
    @IsNotEmpty()
    reason: string;

    @Expose()
    details: number;
}

export class Ticket extends MongoDoc {
    @Expose()
    @IsNotEmpty()
    name: string;

    @Expose()
    @IsNotEmpty()
    price: number;

    @Expose()
    @IsNotEmpty()
    priority: number;

    @Expose()
    @IsNotEmpty()
    description: string;

    @Expose()
    @IsNotEmpty()
    itMust: string[];

    status: TicketStatus;
    rejections?: TicketRejection[];
}
