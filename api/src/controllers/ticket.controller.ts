import { Controller, Post, Body, Get, BadRequestException, Param, Query } from '@nestjs/common';

import { Ticket } from '../models/ticket';
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

    @Get('mine')
    getMyTicket(@Query() { userId }): Promise<Ticket> {
        // TODO: use token instead of userId and validate
        if (!userId) {
            throw new BadRequestException('userId required');
        }

        return this.ticketService.getTicketAssignedToUser(userId);
    }

    @Post()
    addTicket(@Body() ticket: Ticket): Promise<Ticket> {
        return this.ticketService.add(ticket);
    }

    @Post('pickup')
    pickUpTicket(@Query() { userId }): Promise<Ticket> {
        // TODO: use token instead of userId and validate
        if (!userId) {
            throw new BadRequestException('userId required');
        }

        const currentlyAssignedTicket = this.ticketService.getTicketAssignedToUser(userId);
        if (currentlyAssignedTicket) {
            return null;
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
