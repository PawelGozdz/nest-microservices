import { IsAlphanumeric, IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 15)
  @IsAlphanumeric()
  username: string;
}
