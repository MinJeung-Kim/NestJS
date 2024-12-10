import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board-enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  // user과 board의 관계 형성
  // { eager: false } user의 정보를 가져오지 않음
  @ManyToOne(() => User, (user) => user.boards, { eager: false })
  user: User;
}
