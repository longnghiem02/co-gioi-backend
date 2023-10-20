import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Current password',
    example: '123a@A',
  })
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'New password',
    example: 'A@a321',
  })
  newPassword: string;
}
