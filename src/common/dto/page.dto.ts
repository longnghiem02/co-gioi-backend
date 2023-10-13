import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { MetaDTO } from './meta.dto';

export class PageDTO {
  @IsArray()
  data: object[];

  @Type(() => MetaDTO)
  meta: MetaDTO;

  constructor(data: object[], meta: MetaDTO) {
    this.data = data;
    this.meta = meta;
  }
}
