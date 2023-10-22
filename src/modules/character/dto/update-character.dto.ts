import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCharacterDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    example: 'Example',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'title',
    example: 'Example',
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'description',
    example: 'Example',
  })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'detail',
    example: 'Example',
  })
  detail: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'image',
    example: '',
  })
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'mainPathId',
    example: 0,
  })
  mainPathId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'mainPathId',
    example: 0,
  })
  subPathId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'regionId',
    example: 0,
  })
  regionId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'raceId',
    example: 0,
  })
  raceId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'physiqueId',
    example: 0,
  })
  physiqueId: number;
}
