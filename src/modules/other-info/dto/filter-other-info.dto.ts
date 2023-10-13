import { IsOptional, IsString } from 'class-validator';

export class FilterOtherInfoDTO {
  @IsOptional()
  @IsString()
  type: string;
}
