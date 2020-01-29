import { Injectable } from '@nestjs/common';

import { Ticket, TicketStatus } from '../models/ticket';
import { DatabaseService } from './database.service';
import { UserService } from './user.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class TicketService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly userService: UserService,
    ) {}

    add(ticket: Ticket): Promise<Ticket> {
        return new Promise(resolve => {
            this.databaseService.getTicketCollection().then(collection => {
                collection.insertOne({ ...ticket, status: TicketStatus.Unassigned }).then(() => {
                    resolve(ticket);
                });
            });
        });
    }

    getAll(): Promise<Ticket[]> {
        return new Promise(resolve => {
            this.databaseService.getTicketCollection().then(collection => {
                collection.find().toArray().then(tickets => resolve(tickets));
            });
        });
    }

    pickUpTicket(userId: string): Promise<Ticket> {
        return new Promise(resolve => {
            this.databaseService.getTicketCollection().then(collection => {
                collection.findOne({ status: TicketStatus.Unassigned }).then(unassignedTicket => {
                    if (unassignedTicket) {
                        this.userService.assignTicketToUser(unassignedTicket._id as string, userId).then(() => {
                            collection.updateOne(
                                { _id: new ObjectId(unassignedTicket._id) },
                                { $set: { status: TicketStatus.Assigned } },
                            ).then(() => resolve(unassignedTicket));
                        });
                    } else {
                        resolve(null);
                    }
                });
            });
        });
    }

    getTicketAssignedToUser(userId: string): Promise<Ticket> {
        return new Promise(resolve => {
            this.databaseService.getUserCollection().then(userCollection => {
                userCollection.findOne({ _id: new ObjectId(userId) }).then(user => {
                    this.databaseService.getTicketCollection().then(ticketCollection => {
                        ticketCollection.findOne({ _id: user.assignedTicketId }).then(ticket => {
                            resolve(ticket);
                        });
                    });
                });
            });
        });
    }

    unassignTicket(userId: string): Promise<Ticket> {
        return new Promise(resolve => {
            this.getTicketAssignedToUser(userId).then(assignedTicket => {
                if (!assignedTicket) { resolve(null); }
    
                this.databaseService.getTicketCollection().then(collection => {
                    this.userService.unassignTicketFromUser(userId).then(() => {
                        collection.updateOne(
                            { _id: new ObjectId(assignedTicket._id) },
                            { $set: { status: TicketStatus.Unassigned } },
                        ).then(() => resolve(assignedTicket));
                    });
                });
            });
        });
    }

    completeTicket(userId: string): Promise<Ticket> {
        return new Promise(resolve => {
            this.getTicketAssignedToUser(userId).then(assignedTicket => {
                if (!assignedTicket) { resolve(null); }
    
                this.databaseService.getTicketCollection().then(collection => {
                    this.userService.unassignTicketFromUser(userId).then(() => {
                        collection.updateOne(
                            { _id: new ObjectId(assignedTicket._id) },
                            { $set: { status: TicketStatus.Done } },
                        ).then(() => resolve(assignedTicket));
                    });
                });
            });
        });
    }
}
