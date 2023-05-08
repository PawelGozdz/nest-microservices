import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsDefined, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDepartmentDto {
  @ApiProperty({
    example: 'IT',
  })
  @IsOptional()
  @IsDefined()
  @IsString()
  @Length(2, 15)
  @IsAlphanumeric()
  name: string;
}
