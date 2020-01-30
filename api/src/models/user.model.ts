import { IsNotEmpty, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

import { MongoDoc, MongoId } from './mongo-doc.model';

export class User extends MongoDoc {
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

    assignedTicketId?: MongoId;
}
