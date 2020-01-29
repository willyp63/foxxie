import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UserController } from './controllers/user.controller';
import { TicketController } from './controllers/ticket.controller';

import { DatabaseService } from './services/database.service';
import { UserService } from './services/user.service';
import { TicketService } from './services/ticket.service';

@Module({
  imports: process.env.NODE_ENV === 'production'
    ? [ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'ui') })]
    : [],
  controllers: [
    // Controllers
    UserController,
    TicketController,
  ],
  providers: [
    // Services
    DatabaseService,
    UserService,
    TicketService,
  ],
})
export class AppModule {}
