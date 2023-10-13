import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSecludedDomainDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  pathId: number;

  @IsString()
  description: string;

  @IsString()
  detail: string;

  @IsString()
  image: string;
}
