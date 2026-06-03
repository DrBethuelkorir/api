import { CreateUserDto } from '@/auth/DTO/create.user.dto';
import { Injectable, ConflictException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async createUser(createUserDto: CreateUserDto) {
    const { password, ...users } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.users.create({
        data: {
            ...users,
            password: hashedPassword,
        },
    });
}
async findUserByEmail(email: string) {
            return await this.prisma.users.findUnique({ where: { email } });
        }
async checkPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}
}