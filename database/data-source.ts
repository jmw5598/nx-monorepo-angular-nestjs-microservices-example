import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  logging: process.env.TYPEORM_LOGGING,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ["./database/migrations/*.ts"],
  migrationsTableName: "_migration_history",
  subscribers: [],
  entities: ["./libs/services/common/src/lib/entities/**/*.entity.ts"]
} as any);

console.log(process.env.TYPEORM_CONNECTION);
