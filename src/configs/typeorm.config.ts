import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 54321,
  username: 'postgres',
  password: 'admin',
  database: 'board-app',
  entities: [Board],
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
