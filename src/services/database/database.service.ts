import { Injectable } from '@nestjs/common';
import { Db, MongoClient, Collection } from 'mongodb';

import { MONGO_URL, DB_NAME } from '../../constants/db';
import { COLLECTION_NAMES } from '../../constants/collection-names';

import { User } from '../../models/user';

@Injectable()
export class DatabaseService {
    private db: Promise<Db> = new Promise((resolve) => {
        MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, client) => {
            if (err) { throw err; }
            resolve(client.db(DB_NAME));
        });
    });

    getCollection<T>(collectionName: string): Promise<Collection<T>> {
        return new Promise((resolve) => {
            this.db.then((db: Db) => resolve(db.collection(collectionName)));
        });
    }

    getUserCollection = () => this.getCollection<User>(COLLECTION_NAMES.USER);
}
