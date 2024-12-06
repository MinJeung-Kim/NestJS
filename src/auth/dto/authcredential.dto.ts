import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  // 비밀번호 패턴 검사
  @Matches(/(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*)/, {
    message: 'password too weak',
  })
  password: string;
}
