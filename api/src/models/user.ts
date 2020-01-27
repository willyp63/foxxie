import { ObjectId } from 'mongodb';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

export class User {
    id: ObjectId;

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
}
