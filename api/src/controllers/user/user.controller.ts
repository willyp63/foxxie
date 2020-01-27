import { Controller, Post, Body, Get, Param, BadRequestException, HttpCode } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    getUser(@Param('id') userId: ObjectId): Promise<User> {
        return this.userService.get(userId).then(user => {
            if (!user) { throw new BadRequestException('Invalid user'); }
            return user;
        });
    }

    @Post()
    addUser(@Body() user: User): Promise<User> {
        return this.userService.add(user);
    }

    @Post('/login')
    @HttpCode(200)
    async loginUser(@Body() user: Partial<User>): Promise<User> {
        const loggedInUser = await this.userService.getByEmailAndPassword(user.email, user.password);

        if (!loggedInUser) {
            throw new BadRequestException('Invalid credentials');
        }
        return loggedInUser;
    }
}
