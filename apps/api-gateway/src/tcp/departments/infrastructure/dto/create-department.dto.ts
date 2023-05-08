import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsDefined, IsString, Length } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    example: 'IT',
  })
  @IsDefined()
  @IsString()
  @Length(2, 15)
  @IsAlphanumeric()
  name: string;
}

export class CreateDepartmentResponse {
  @ApiProperty({
    example: '84e1ba0c-ef31-4000-a9a8-470f6d1444c6',
  })
  id: string;
}
