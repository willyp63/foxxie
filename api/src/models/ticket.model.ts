import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

import { MongoDoc } from './mongo-doc.model';

export enum TicketStatus {
    Unassigned = 0,
    Assigned = 1,
    Done = 2,
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

    status?: TicketStatus;
}
