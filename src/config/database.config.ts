import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, ENTITIES, PORT_SERVER } from './constants';

const database_config: TypeOrmModuleOptions = {
  type: "mysql",
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  //  entities: ['{src,dist}/**/*.entity{.ts,.js}'],
  entities: ENTITIES,
  synchronize: true,
  dropSchema: false,
  migrations: [],
  autoLoadEntities: true,
  timezone:"Asia/Ho_Chi_Minh"
};

export { database_config }
