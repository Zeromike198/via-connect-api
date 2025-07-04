import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { conn } from 'src/models/mysqlConnection';
import { handleError } from 'src/utils/handleError';
import { ProfileUserDto } from './user.dto';
import {
  emailSchema,
  lastNameSchema,
  nameSchema,
} from 'src/register/register.schema';

@Injectable()
export class UserService {
  async getUserProfile(userID: string, res: Response) {
    try {
      const connection = await conn();

      const [row] = await connection.execute<ResultSetHeader[]>(
        'SELECT name, lastName, email, image, role FROM user WHERE userID = ?',
        [userID],
      );

      await connection.end();

      if (row.length === 0)
        return res.status(400).json({ response: 'El usuario no existe' });

      return res.json({ user: row[0] });
    } catch (err) {
      return handleError(res, err);
    }
  }

  async updateUserProfile(userID: string, user: ProfileUserDto, res: Response) {
    try {
      const connection = await conn();

      const [row] = await connection.execute<RowDataPacket[]>(
        'SELECT name, lastName, email, image, role FROM user WHERE userID = ?',
        [userID],
      );

      if (row.length === 0) {
        await connection.end();
        return res.status(400).json({ response: 'El usuario no existe' });
      }

      const { name, lastName, email, image } = user;

      //format with zod
      await nameSchema.parseAsync(name);
      await lastNameSchema.parseAsync(lastName);
      await emailSchema.parseAsync(email);

      const [row2] = await connection.execute<RowDataPacket[]>(
        'SELECT COUNT(*) as email FROM user WHERE userID != ? AND email = ?',
        [userID, email],
      );

      const emailRepeat = row2[0].email as number;

      if (emailRepeat > 0) {
        await connection.end();
        return res.status(400).json({ response: '¡El correo ya existe!' });
      }

      await connection.execute(
        'UPDATE user SET name = ?, lastName = ?, email = ?, image = ? WHERE userID = ?',
        [name, lastName, email, image, userID],
      );

      await connection.end();

      return res.json({ response: 'success' });
    } catch (err) {
      return handleError(res, err);
    }
  }
}
