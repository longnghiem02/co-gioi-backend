import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBlandGheavenDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  pathId: number;

  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @IsString()
  description: string;

  @IsString()
  detail: string;

  @IsString()
  image: string;
}
