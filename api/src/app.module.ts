import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UserController } from './controllers/user/user.controller';

import { DatabaseService } from './services/database/database.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: process.env.NODE_ENV === 'production'
    ? [ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'ui') })]
    : [],
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
