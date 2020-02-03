import { Injectable, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { Ticket, TicketStatus, TicketRejection } from '../models/ticket.model';
import { DatabaseService } from './database.service';
import { MongoId } from '../models/mongo-doc.model';

@Injectable()
export class TicketService {
    constructor(
        private readonly db: DatabaseService,
    ) {}

    async add(ticket: Ticket): Promise<Ticket> {
        const ticketCollection = await this.db.getTicketCollection();
        await ticketCollection.insertOne(ticket);
        return ticket;
    }

    async getAll(): Promise<Ticket[]> {
        const ticketCollection = await this.db.getTicketCollection();
        return ticketCollection.find().sort({ priority: 1, name: 1 }).toArray();
    }

    async getById(ticketId: MongoId): Promise<Ticket> {
        const ticketCollection = await this.db.getTicketCollection();
        return ticketCollection.findOne({ _id: new ObjectId(ticketId) });
    }

    async updateTicket(ticketId: MongoId, ticket: Ticket): Promise<null> {
        const ticketCollection = await this.db.getTicketCollection();
        const existingTicket = await ticketCollection.findOne({ _id: new ObjectId(ticketId) });

        // dont let a ticket be moved from another status to Assigned
        if (existingTicket.status !== TicketStatus.Assigned && ticket.status === TicketStatus.Assigned) {
            throw new BadRequestException('You can not set a tickets status to Assigned.');
        }

        await ticketCollection.updateOne(
            { _id: new ObjectId(ticketId) },
            { $set: ticket },
        );

        // if ticket was moved from Assigned to another status
        if (existingTicket.status === TicketStatus.Assigned && ticket.status !== TicketStatus.Assigned) {
            // remove the assigned user from the ticket
            const userCollection = await this.db.getUserCollection();
            const userAssignedToTicket = await userCollection.findOne({ assignedTicketId: existingTicket._id });
            
            if (userAssignedToTicket) {
                await userCollection.updateOne(
                    { _id: new ObjectId(userAssignedToTicket._id) },
                    { $set: { assignedTicketId: null } },
                );
            }
        }

        return null;
    }

    async deleteTicket(ticketId: MongoId): Promise<null> {
        const ticketCollection = await this.db.getTicketCollection();
        await ticketCollection.deleteOne({ _id: new ObjectId(ticketId) });
        return null;
    }

    async pickUpTicket(userId: MongoId): Promise<Ticket> {
        // make sure they are not already assigned a ticket
        const assignedTicket = await this.getTicketAssignedToUser(userId);
        if (assignedTicket) { return null; }

        // get the highest priority ticket that is ready
        const ticketCollection = await this.db.getTicketCollection();
        const readyTickets = await ticketCollection.find()
            .filter({ status: TicketStatus.Ready })
            .sort({ priority: 1, name: 1 })
            .toArray();
        const ticketToPickUp = readyTickets[0];

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

    async rejectTicket(userId: MongoId, rejection: TicketRejection): Promise<Ticket> {
        const ticket = await this.unassignTicketFromUserAndSetStatus(userId, TicketStatus.NotReady);

        // add rejection to ticket
        const ticketCollection = await this.db.getTicketCollection();
        await ticketCollection.updateOne(
            { _id: new ObjectId(ticket._id) },
            { $push: { rejections: rejection } }
        );

        return ticket;
    }

    async completeTicket(userId: MongoId): Promise<Ticket> {
        return await this.unassignTicketFromUserAndSetStatus(userId, TicketStatus.Done);
    }

    private async unassignTicketFromUserAndSetStatus(userId: MongoId, status: TicketStatus) {
        const assignedTicket = await this.getTicketAssignedToUser(userId);
        if (!assignedTicket) { return null; }

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
