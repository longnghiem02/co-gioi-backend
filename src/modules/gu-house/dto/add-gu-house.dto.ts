import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddGuHouseDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  pathId: number;

  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @IsNotEmpty()
  @IsNumber()
  rankId: number;

  @IsString()
  description: string;

  @IsString()
  detail: string;

  @IsString()
  image: string;
}
