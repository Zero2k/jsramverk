import { createConnection, getConnectionOptions } from 'typeorm';

export const db = async (drop: boolean = false) => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

  const database = createConnection({
    ...connectionOptions,
    name: 'default',
    dropSchema: drop
  } as any);

  console.log(database);

  return database;
};

export default db;
