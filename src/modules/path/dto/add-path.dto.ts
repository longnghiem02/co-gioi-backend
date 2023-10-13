import { IsNotEmpty, IsString } from 'class-validator';

export class AddPathDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  detail: string;
}
