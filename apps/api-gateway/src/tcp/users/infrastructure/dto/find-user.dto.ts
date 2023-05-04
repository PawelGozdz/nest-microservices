import { ApiProperty } from '@nestjs/swagger';

export class FindOneUserResponse {
  @ApiProperty({
    example: '84e1ba0c-ef31-4000-a9a8-470f6d1444c6',
  })
  id: string;

  @ApiProperty({
    example: 'test@test.com',
  })
  email: string;

  @ApiProperty({
    example: 'IamGroot',
  })
  username: string;
}
