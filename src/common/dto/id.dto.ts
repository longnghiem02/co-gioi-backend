import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class IdDTO {
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}
