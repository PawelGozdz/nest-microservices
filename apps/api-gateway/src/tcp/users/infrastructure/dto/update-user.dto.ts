import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsDefined, IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'test@test.com',
  })
  @IsOptional()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'IamGroot',
  })
  @IsOptional()
  @IsDefined()
  @IsString()
  @Length(2, 15)
  @IsAlphanumeric()
  username: string;
}
