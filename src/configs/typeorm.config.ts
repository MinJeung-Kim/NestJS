import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 54321,
  username: 'postgres',
  password: 'admin',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
