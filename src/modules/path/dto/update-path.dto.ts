import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePathDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  detail: string;
}
