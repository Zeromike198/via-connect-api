import { Body, Controller, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginService } from './login.service';
import { LoginUserDto } from './login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('')
  async loginUser(@Body() loginUser: LoginUserDto, @Res() res: Response) {
    return this.loginService.loginUser(loginUser, res);
  }
}
