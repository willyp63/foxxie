import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';

export enum TicketStatus {
    Unassigned,
    Assigned,
    Done,
}

export class Ticket {
    _id: string | ObjectId;

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
