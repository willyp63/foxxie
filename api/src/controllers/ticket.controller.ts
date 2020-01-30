import { Controller, Post, Body, Get, BadRequestException, Query } from '@nestjs/common';

import { Ticket } from '../models/ticket.model';
import { TicketService } from '../services/ticket.service';

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

    @Post('pickup')
    pickUpTicket(@Query() { userId }): Promise<Ticket> {
        // TODO: use token instead of userId and validate
        if (!userId) {
            throw new BadRequestException('userId required');
        }

        return this.ticketService.pickUpTicket(userId);
    }

    @Post('unassign')
    unassignTicket(@Query() { userId }): Promise<Ticket> {
        // TODO: use token instead of userId and validate
        if (!userId) {
            throw new BadRequestException('userId required');
        }

        return this.ticketService.unassignTicket(userId);
    }

    @Post('complete')
    completeTicket(@Query() { userId }): Promise<Ticket> {
        // TODO: use token instead of userId and validate
        if (!userId) {
            throw new BadRequestException('userId required');
        }

        return this.ticketService.completeTicket(userId);
    }
}