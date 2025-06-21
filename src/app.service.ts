import { Injectable } from '@nestjs/common';
import { conn } from './models/mysqlConnection';
import { ResultSetHeader } from 'mysql2';
import { Response } from 'express';
import { handleError } from './utils/handleError';

@Injectable()
export class AppService {
  async getAllUsers(res: Response) {
    try {
      const connection = await conn();

      const [row] = await connection.query<ResultSetHeader[]>(
        'SELECT COUNT(*) as totalUser FROM user',
      );
      await connection.end();

      return res.json({ response: row.length });
    } catch (err) {
      return handleError(res, err);
    }
  }
}
