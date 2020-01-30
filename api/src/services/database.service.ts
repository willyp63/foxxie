import { Injectable } from '@nestjs/common';
import { Db, MongoClient, Collection } from 'mongodb';

import { User } from '../models/user.model';
import { Ticket } from '../models/ticket.model';

export const DB_NAME = process.env.MONGODB_URI ? '' : 'foxxie';
export const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017';

export const COLLECTION_NAMES = {
    USER: 'users',
    TICKET: 'tickets',
};

@Injectable()
export class DatabaseService {
    private db: Promise<Db> = new Promise((resolve) => {
        MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, client) => {
            if (err) { throw err; }
            resolve(client.db(DB_NAME));
        });
    });

    async getCollection<T>(collectionName: string): Promise<Collection<T>> {
        const db = await this.db;
        return db.collection(collectionName);
    }

    getUserCollection = () => this.getCollection<User>(COLLECTION_NAMES.USER);
    getTicketCollection = () => this.getCollection<Ticket>(COLLECTION_NAMES.TICKET);
}
