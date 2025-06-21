import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { handleError } from 'src/utils/handleError';
import { LoginUserDto } from './login.dto';
import { emailSchema, passwordSchema } from 'src/register/register.schema';
import { conn } from 'src/models/mysqlConnection';
import { RowDataPacket } from 'mysql2';

@Injectable()
export class LoginService {
  async loginUser(loginUser: LoginUserDto, res: Response) {
    try {
      //format with zod
      await emailSchema.parseAsync(loginUser.email);
      await passwordSchema.parseAsync(loginUser.password);

      const { email, password } = loginUser;
      const connection = await conn();

      const [row] = await connection.query<RowDataPacket[]>(
        'SELECT userID, password FROM user WHERE email = ?',
        [email],
      );

      if (row.length === 0) {
        await connection.end();
        return res
          .status(400)
          .json({ response: 'El correo no está registrado' });
      }
      const userID: number = row[0].userID as number;
      const passwordHash: string = row[0].password as string;

      if (!bcrypt.compareSync(password, passwordHash)) {
        await connection.end();
        return res.status(400).json({ response: 'Contraseña incorrecta' });
      }

      return res.json({ response: userID });
    } catch (err) {
      return handleError(res, err);
    }
  }
}
