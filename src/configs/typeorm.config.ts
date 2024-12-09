import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeORMConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('common.db.host'),
  port: configService.get<number>('common.db.port'),
  username: configService.get<string>('common.db.user'),
  password: configService.get<string>('common.db.password'),
  database: configService.get<string>('common.db.database'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: configService.get<string>('NODE_ENV') === 'development', // 개발 환경에서만 true로 설정
});
