import { Injectable } from '@nestjs/common';

import { User } from '../models/user';
import { DatabaseService } from './database.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
    constructor(
        private readonly databaseService: DatabaseService,
    ) {}

    add(user: User): Promise<User> {
        return new Promise(resolve => {
            this.databaseService.getUserCollection().then(collection => {
                collection.insertOne(user).then(() => {
                    resolve({ ...user, password: undefined });
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

    getByUsernameAndPassword(username: string, password: string): Promise<User> {
        return new Promise(resolve => {
            this.databaseService.getUserCollection().then(collection => {
                collection.findOne({ username, password }).then(user => resolve(user));
            });
        });
    }

    assignTicketToUser(ticketId: string, userId: string) {
        return new Promise(resolve => {
            this.databaseService.getUserCollection().then(collection => {
                collection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $set: { assignedTicketId: ticketId } },
                ).then(() => resolve());
            });
        });
    }

    unassignTicketFromUser(userId: string) {
        return new Promise(resolve => {
            this.databaseService.getUserCollection().then(collection => {
                collection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $set: { assignedTicketId: null } },
                ).then(() => resolve());
            });
        });
    }
}
