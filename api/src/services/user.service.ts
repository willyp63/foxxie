import { Injectable } from '@nestjs/common';

import { User } from '../models/user.model';
import { DatabaseService } from './database.service';

@Injectable()
export class UserService {
    constructor(
        private readonly db: DatabaseService,
    ) {}

    async add(user: User): Promise<User> {
        const userCollection = await this.db.getUserCollection();
        await userCollection.insertOne(user);
        return { ...user, password: undefined };
    }

    async getAll(): Promise<User[]> {
        const userCollection = await this.db.getUserCollection();
        return userCollection.find().toArray();
    }

    async getByUsernameAndPassword(username: string, password: string): Promise<User> {
        const userCollection = await this.db.getUserCollection();
        return userCollection.findOne({ username, password });
    }
}
