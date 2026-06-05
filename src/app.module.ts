import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
// import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [
    PrismaModule,
     UserModule,
      AuthModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      // PostsModule,
      CommentsModule,
      ProfileModule
    ],
  controllers: [],
})
export class AppModule {}
