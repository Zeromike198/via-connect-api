import { z } from 'zod';
import * as bcrypt from 'bcryptjs';
import { ResultSetHeader } from 'mysql2/promise';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './register.dto';
import { Response } from 'express';
import {
  emailSchema,
  lastNameSchema,
  nameSchema,
  passwordSchema,
  roleSchema,
} from './register.schema';
import { conn } from 'src/models/mysqlConnection';

@Injectable()
export class RegisterService {
  async createUser(createUser: CreateUserDto, res: Response) {
    try {
      //format with zod
      await nameSchema.parseAsync(createUser.name);
      await lastNameSchema.parseAsync(createUser.lastName);
      await emailSchema.parseAsync(createUser.email);
      await roleSchema.parseAsync(createUser.role);
      await passwordSchema.parseAsync(createUser.password);

      //handle db
      const { name, lastName, email, role, password } = createUser;

      const connection = await conn();

      const [row] = await connection.query<ResultSetHeader[]>(
        'SELECT email FROM user WHERE email = ?',
        [email],
      );

      if (row.length > 0)
        return res
          .status(400)
          .json({ message: 'El correo electrónico ya está registrado' });

      const passwordHash = bcrypt.hashSync(password, 10);

      await connection.query(
        'INSERT INTO user(name, lastName, email, role, password) VALUES (?, ?, ?, ?, ?)',
        [name, lastName, email, role, passwordHash],
      );

      return res.status(200).json({ message: 'success' });
    } catch (err) {
      console.log(err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({ response: err.errors[0].message });
      }
      return res
        .status(500)
        .json({ response: 'Ha ocurrido un error en el servidor' });
    }
  }
}
