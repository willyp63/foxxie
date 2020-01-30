import { ObjectId } from 'mongodb';

export type MongoId = ObjectId | string;

export class MongoDoc {
    _id: MongoId;
}
