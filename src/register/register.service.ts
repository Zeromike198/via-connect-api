import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './register.dto';
import { Response } from 'express';

@Injectable()
export class RegisterService {
  async createUser(createUser: CreateUserDto, res: Response) {
    try {
      //format with zod
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ response: 'Ha ocurrido un error en el servidor' });
    }
  }
}
