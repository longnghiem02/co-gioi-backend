import { IsNotEmpty, IsString } from 'class-validator';

export class AddRoleDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  detail: string;
}
