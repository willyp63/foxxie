import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';

import { User } from '../../models/user';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
    constructor(
        private readonly databaseService: DatabaseService,
    ) {}

    add(user: User): Promise<User> {
        return new Promise(resolve => {
            this.databaseService.getUserCollection().then(collection => {
                collection.insertOne(user).then(insertOp => {
                    resolve({ ...user, id: insertOp.insertedId, password: undefined });
                });
            });
        });
    }

    getAll(): Promise<User[]> {
        return new Promise(resolve => {
            this.databaseService.getUserCollection().then(collection => {
                collection.find().toArray().then(users => resolve(users));
            });
        });
    }

    get(userId: ObjectId): Promise<User> {
        return new Promise(resolve => {
            this.databaseService.getUserCollection().then(collection => {
                collection.findOne({ id: userId }).then(user => resolve(user));
            });
        });
    }

    getByEmailAndPassword(userEmail: string, userPassword: string): Promise<User> {
        return new Promise(resolve => {
            this.databaseService.getUserCollection().then(collection => {
                collection.findOne({ email: userEmail, password: userPassword }).then(user => resolve(user));
            });
        });
    }
}
