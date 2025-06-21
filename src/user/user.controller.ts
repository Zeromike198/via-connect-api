import { Controller, Get, Headers, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

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
}
