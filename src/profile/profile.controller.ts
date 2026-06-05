import { Controller, Get, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { AuthGuard, } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get('me')
  @UseGuards(AuthGuard('jwt')) // Ensure this route is protected by JWT authentication
  async getProfile(@Req() request: Request) {
    return request.user; // Assuming the user information is attached to the request object by the authentication middleware
  }
}
