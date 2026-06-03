import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './DTO/create.user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

    async signup(createUserDto: CreateUserDto) {
        const user = await this.userService.findUserByEmail(createUserDto.email);
        if (user) {
            throw new ConflictException('User with this email already exists');
        }
        return this.userService.createUser(createUserDto);
    }
    async signin(createUserDto: CreateUserDto) {
        const user = await this.userService.findUserByEmail(createUserDto.email);
        if (!user) {
            throw new ConflictException('Invalid credentiaals');
        }
        const isPasswordValid = await this.userService.checkPassword(createUserDto.password, user.password);
        if (!isPasswordValid) {
            throw new ConflictException('Invalid credentials');
        }
        // Here you would typically verify the password
         // Remove password before returning user data
        const { password, ...userWithoutPassword } = user;
        return this.jwtSign(user.id, user.email);
    }
    jwtSign(userid: string, email: string) {
        const payload = { sub: userid, email };
        const secret = this.configService.get('JWT_SECRET');
        return {
            access_token: this.jwtService.sign(payload, { secret }),
        }
    }
}