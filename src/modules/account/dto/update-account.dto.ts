import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAccountDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Username',
    example: 'Example',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Email',
    example: 'example@gmail.com',
  })
  email: string;
}
