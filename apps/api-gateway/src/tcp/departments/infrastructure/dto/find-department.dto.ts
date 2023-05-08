import { ApiProperty } from '@nestjs/swagger';

export class FindOneDepartmentResponse {
  @ApiProperty({
    example: '84e1ba0c-ef31-4000-a9a8-470f6d1444c6',
  })
  id: string;

  @ApiProperty({
    example: 'IT',
  })
  name: string;

  @ApiProperty({
    example: new Date(),
  })
  updatedAt: Date;

  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date;
}
