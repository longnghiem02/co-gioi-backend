import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  detail: string;
}
