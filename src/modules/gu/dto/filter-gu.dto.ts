import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { PaginateDTO } from 'src/common/dto';

export class FilterGuDTO extends PaginateDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Search name',
    example: 'Example',
  })
  search?: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    description: 'Path id',
    example: '0',
  })
  pathId?: number;
}
