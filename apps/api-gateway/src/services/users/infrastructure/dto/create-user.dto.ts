import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@test.com',
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'IamGroot',
  })
  @IsDefined()
  @IsString()
  @Length(2, 15)
  @IsAlphanumeric()
  username: string;
}

export class CreateUserResponse {
  @ApiProperty({
    example: '84e1ba0c-ef31-4000-a9a8-470f6d1444c6',
  })
  id: string;
}
