import { CreateUserDto } from '@/auth/DTO/create.user.dto';
import { Injectable, ConflictException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.users.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
}
async findUserByEmail(email: string) {
            return await this.prisma.users.findUnique({ where: { email } });
        }
}