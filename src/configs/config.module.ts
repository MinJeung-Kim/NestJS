import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import common from './common.config';
import { validate } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
      load: [common],
      isGlobal: true,
      validate,
    }),
  ],
})
export class ConfigModule {}
