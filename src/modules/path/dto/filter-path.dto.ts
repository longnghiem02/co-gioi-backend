import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginateDTO } from 'src/common/dto';

export class FilterPathDTO extends PaginateDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Search name',
    example: 'Example',
  })
  search?: string;
}
