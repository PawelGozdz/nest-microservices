import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

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

  @ApiProperty({
    example: '333b041c-326d-459c-bb07-624b8163c693',
  })
  @IsOptional()
  @IsDefined()
  @IsUUID()
  updatedDepartmentId: string;
}
