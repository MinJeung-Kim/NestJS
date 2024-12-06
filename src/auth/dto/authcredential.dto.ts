import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)

  // 영어 대문자, 소문자, 숫자, 특수문자 포함해야함
  //   @Matches(/(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*)/, {
  //     message: 'password too weak',
  //   })

  // 영어랑 숫자만 허용
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}
