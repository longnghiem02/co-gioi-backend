import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAccountDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
