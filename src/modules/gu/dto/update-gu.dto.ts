import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGuDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name',
    example: 'Example',
  })
  name: string;

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
    description: 'pathId',
    example: 0,
  })
  pathId: number;
}
