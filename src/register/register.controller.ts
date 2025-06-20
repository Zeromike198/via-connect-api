import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './register.dto';
import { Response } from 'express';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  async createUser(@Body() createUser: CreateUserDto, @Res() res: Response) {
    return this.registerService.createUser(createUser, res);
  }
}
