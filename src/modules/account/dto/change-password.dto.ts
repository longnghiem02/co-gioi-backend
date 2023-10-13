import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
