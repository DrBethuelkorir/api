// import { Injectable } from '@nestjs/common';
// import { CreatePostDto } from './DTO/createpost.dto';
// import { PrismaService } from '../prisma/prisma.service';
// import { UserService } from '../user/user.service';
// import { users } from '../../generated/prisma';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class PostsService {
//     constructor(
//         private readonly prismaService: PrismaService, 
//         private readonly userService: UserService,
//         private readonly jwtService: JwtService
//     ) {}

//     createPost(createPostDto: CreatePostDto) {
//         const { title, content } = createPostDto; 
//         const userid = this.jwtService.decode(token).sub; // Assuming you have the token available here
//        if (!user) {
//         throw new Error('No user found to associate with the post');
//        }

//         const newPost = this.prismaService.post.create({
//             data: {  title, content     }
//         });
//         return newPost;
//     }   
// }