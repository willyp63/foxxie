import { IsNotEmpty, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class User {
    _id: string | ObjectId;

    @Expose()
    @IsNotEmpty()
    username: string;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Expose()
    @IsNotEmpty()
    password: string;

    assignedTicketId?: string;
}
