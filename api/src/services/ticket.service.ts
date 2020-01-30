import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { Ticket, TicketStatus } from '../models/ticket.model';
import { DatabaseService } from './database.service';
import { MongoId } from '../models/mongo-doc.model';

@Injectable()
export class TicketService {
    constructor(
        private readonly db: DatabaseService,
    ) {}

    async add(ticket: Ticket): Promise<Ticket> {
        const ticketCollection = await this.db.getTicketCollection();
        const ticketWithStatus = { ...ticket, status: TicketStatus.Unassigned };
        await ticketCollection.insertOne(ticketWithStatus);
        return ticketWithStatus;
    }

    async getAll(): Promise<Ticket[]> {
        const ticketCollection = await this.db.getTicketCollection();
        return ticketCollection.find().toArray();
    }

    async pickUpTicket(userId: MongoId): Promise<Ticket> {
        // make sure they are not already assigned a ticket
        const assignedTicket = await this.getTicketAssignedToUser(userId);
        if (assignedTicket) { return null; }

        // get the highest priority unassigned ticket
        const ticketCollection = await this.db.getTicketCollection();
        const unassignedTickets = await ticketCollection.find()
            .filter({ status: TicketStatus.Unassigned })
            .sort({ priority: 1, name: 1 })
            .toArray();
        const ticketToPickUp = unassignedTickets[0];

        if (!ticketToPickUp) { return null; }

        // assign ticket to user
        const userCollection = await this.db.getUserCollection();
        await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { assignedTicketId: ticketToPickUp._id } },
        );

        // set ticket status to assigned
        await ticketCollection.updateOne(
            { _id: new ObjectId(ticketToPickUp._id) },
            { $set: { status: TicketStatus.Assigned } },
        );

        return ticketToPickUp;
    }

    async getTicketAssignedToUser(userId: MongoId): Promise<Ticket> {
        const userCollection = await this.db.getUserCollection(); 
        const ticketCollection = await this.db.getTicketCollection(); 

        const user = await userCollection.findOne({ _id: new ObjectId(userId) });
        return await ticketCollection.findOne({ _id: user.assignedTicketId });
    }

    async unassignTicket(userId: MongoId): Promise<Ticket> {
        return await this.unassignTicketFromUserAndSetStatus(userId, TicketStatus.Unassigned);
    }

    async completeTicket(userId: MongoId): Promise<Ticket> {
        return await this.unassignTicketFromUserAndSetStatus(userId, TicketStatus.Done);
    }

    private async unassignTicketFromUserAndSetStatus(userId: MongoId, status: TicketStatus) {
        const assignedTicket = await this.getTicketAssignedToUser(userId);
        if (assignedTicket) { return null; }

        // unassign ticket from user
        const userCollection = await this.db.getUserCollection();
        await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { assignedTicketId: null } },
        );

        // set ticket status to unassigned
        const ticketCollection = await this.db.getTicketCollection();
        await ticketCollection.updateOne(
            { _id: new ObjectId(assignedTicket._id) },
            { $set: { status } },
        );

        return assignedTicket;
    }
}
