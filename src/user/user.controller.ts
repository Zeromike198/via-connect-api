import { Body, Controller, Get, Headers, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { ProfileUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserProfile(
    @Headers('authorization') userID: string,
    @Res() res: Response,
  ) {
    if (userID === undefined)
      return res.status(401).json({ response: 'El userID es requerido' });
    return this.userService.getUserProfile(userID, res);
  }

  @Patch()
  async updateProfile(
    @Headers('authorization') userID: string,
    @Res() res: Response,
    @Body() user: ProfileUserDto,
  ) {
    if (userID === undefined)
      return res.status(401).json({ response: 'El userID es requerido' });

    return this.userService.updateUserProfile(userID, user, res);
  }
}
