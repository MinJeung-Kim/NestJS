import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { AppController } from './app.controller';

@Module({
  imports: [BoardsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
