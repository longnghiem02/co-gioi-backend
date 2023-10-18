import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGuFormationDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    example: 'Example',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'pathId',
    example: 0,
  })
  pathId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'typeId',
    example: 0,
  })
  typeId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'rankId',
    example: 0,
  })
  rankId: number;

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
}
