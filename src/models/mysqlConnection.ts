// Get the client
import * as mysql from 'mysql2/promise';

export const conn = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'via_connect',
  });

  return connection;
};
