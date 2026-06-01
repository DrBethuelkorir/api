import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './DTO/create.user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async signup(createUserDto: CreateUserDto) {
        const user = await this.userService.findUserByEmail(createUserDto.email);
        if (user) {
            throw new ConflictException('User with this email already exists');
        }
        return this.userService.createUser(createUserDto);
    }
}