import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOtherInfoDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  detail: string;

  @IsString()
  type: string;
}
