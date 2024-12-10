import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './board.entity';
import { BoardStatus } from './board-enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardValidationPipe } from './pipes/border-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get() // 데코레이터
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.getAllBoards(user);
  }

  @Get('/:boardId')
  getBoardById(@Param('boardId') boardId: number): Promise<Board> {
    return this.boardsService.getBoardById(boardId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Patch('/:boardId')
  updateBoard(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body('status', BoardValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoard(boardId, status);
  }

  @Delete('/:boardId')
  deleteBoard(@Param('boardId', ParseIntPipe) boardId, @GetUser() user: User): Promise<void> {
    return this.boardsService.deleteBoard(boardId, user);
  }
}
