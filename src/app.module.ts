import { Module } from '@nestjs/common';

import { UserController } from './controllers/user/user.controller';

import { DatabaseService } from './services/database/database.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [],
  controllers: [
    // Controllers
    UserController,
  ],
  providers: [
    // Services
    DatabaseService,
    UserService,
  ],
})
export class AppModule {}
