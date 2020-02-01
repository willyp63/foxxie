import { Controller, Post, Body, Get, BadRequestException, Query, Param } from '@nestjs/common';

import { Ticket, TicketRejection } from '../models/ticket.model';
import { TicketService } from '../services/ticket.service';
import { MongoId } from 'src/models/mongo-doc.model';

@Controller('tickets')
export class TicketController {
    constructor(
        private readonly ticketService: TicketService,
    ) {}

    @Get()
    getAllTickets(): Promise<Ticket[]> {
        return this.ticketService.getAll();
    }

    @Post()
    addTicket(@Body() ticket: Ticket): Promise<Ticket> {
        return this.ticketService.add(ticket);
    }

    @Get('mine')
    getMyTicket(@Query() { userId }): Promise<Ticket> {
        // TODO: use token instead of userId and validate
        if (!userId) {
            throw new BadRequestException('userId required');
        }

        return this.ticketService.getTicketAssignedToUser(userId);
    }

    @Get(':id')
    getTicket(@Param('id') ticketId: MongoId): Promise<Ticket> {
        return this.ticketService.getById(ticketId);
    }

    @Post('pickup')
    pickUpTicket(@Query() { userId }): Promise<Ticket> {
        // TODO: use token instead of userId and validate
        if (!userId) {
            throw new BadRequestException('userId required');
        }

        return this.ticketService.pickUpTicket(userId);
    }

    @Post('reject')
    rejectTicket(@Query() { userId }, @Body() rejection: TicketRejection): Promise<Ticket> {
        // TODO: use token instead of userId and validate
        if (!userId) {
            throw new BadRequestException('userId required');
        }

        return this.ticketService.rejectTicket(userId, rejection);
    }

    @Post('complete')
    completeTicket(@Query() { userId }): Promise<Ticket> {
        // TODO: use token instead of userId and validate
        if (!userId) {
            throw new BadRequestException('userId required');
        }

        return this.ticketService.completeTicket(userId);
    }

    @Post(':id')
    updateTicket(@Param('id') ticketId: MongoId, @Body() ticket: Ticket): Promise<null> {
        console.log(ticketId);
        console.log(ticket);
        return this.ticketService.updateTicket(ticketId, ticket);
    }
}
