import { Controller, Post, Body, BadRequestException, HttpCode, Get } from '@nestjs/common';

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

    @Post()
    addUser(@Body() user: User): Promise<User> {
        return this.userService.add(user);
    }

    @Post('/login')
    @HttpCode(200)
    async loginUser(@Body() { username, password }: Partial<User>): Promise<User> {
        console.log(`Logging in: ${username} & ${password}`);

        const user = await this.userService.getByUsernameAndPassword(username, password);

        console.log(`Found user: ${user}`);

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }
        return user;
    }
}
