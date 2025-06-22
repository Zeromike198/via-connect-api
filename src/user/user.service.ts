import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { conn } from 'src/models/mysqlConnection';
import { handleError } from 'src/utils/handleError';
import { ProfileUserDto } from './user.dto';

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

      const [row] = await connection.execute<ResultSetHeader[]>(
        'SELECT name, lastName, email, image, role FROM user WHERE userID = ?',
        [userID],
      );

      if (row.length === 0) {
        await connection.end();

        return res.status(400).json({ response: 'El usuario no existe' });
      }

      const { name, lastName, email, image } = user;

      await connection.execute(
        'UPDATE user SET name = ?, lastName = ?, email = ?, image = ?',
        [name, lastName, email, image],
      );
      await connection.end();

      return res.json({ response: 'success' });
    } catch (err) {
      return handleError(res, err);
    }
  }
}
