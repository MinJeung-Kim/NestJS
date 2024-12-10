import { Board } from 'src/boards/board.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // user과 board의 관계 형성
  // { eager: true } board의 정보를 가져옴
  @OneToMany(() => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
