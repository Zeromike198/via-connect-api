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
import { handleError } from 'src/utils/handleError';

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

      if (row.length > 0) {
        await connection.end();
        return res
          .status(400)
          .json({ response: 'El correo electrónico ya está registrado' });
      }

      const passwordHash = bcrypt.hashSync(password, 10);
      const randomImage = await fetch('https://picsum.photos/200/300');

      const row2 = await connection.query<ResultSetHeader>(
        'INSERT INTO user(name, lastName, email, image, role, password) VALUES (?, ?, ?, ?, ?, ?)',
        [name, lastName, email, randomImage.url, role, passwordHash],
      );

      await connection.end();

      return res.status(200).json({ response: row2[0].insertId });
    } catch (err) {
      return handleError(res, err);
    }
  }
}
