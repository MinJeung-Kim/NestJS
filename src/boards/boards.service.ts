import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    // 내 아이디로 작성한 게시글만 가져오기
    query.where('board.userId = :userId', { userId: user.id });

    // .getMany() : 조건에 맞는 전체 data를 가져옴
    const boards = await query.getMany();
    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async updateBoard(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    // delete와 remove가 있는데 둘의 차이점은 delete는 실제로 데이터를 삭제하는 것이 아니라
    // 데이터베이스에서 해당 데이터를 찾아서 삭제 표시를 해주는 것이고, remove는 실제로 데이터를 삭제하는 것이다.
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
}
