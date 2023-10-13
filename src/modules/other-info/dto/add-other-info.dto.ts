import { IsNotEmpty, IsString } from 'class-validator';

export class AddOtherInfoDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  detail: string;

  @IsString()
  type: string;
}
