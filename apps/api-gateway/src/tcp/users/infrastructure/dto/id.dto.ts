import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';

export class IdDto {
  @ApiProperty({
    example: '333b041c-326d-459c-bb07-624b8163c693',
  })
  @IsDefined()
  @IsUUID()
  id: string;
}
