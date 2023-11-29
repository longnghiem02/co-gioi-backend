import { IsArray, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class MetaDTO {
  @IsNumber()
  totalItems: number;

  @IsNumber()
  itemsPerPage: number;

  @IsNumber()
  currentPage: number;

  @IsNumber()
  totalPages: number;

  @IsBoolean()
  hasPreviousPage: boolean;

  @IsBoolean()
  hasNextPage: boolean;

  constructor(totalItems: number, currentPage: number, itemsPerPage: number) {
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = currentPage;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.hasPreviousPage = this.currentPage > 1;
    this.hasNextPage = this.currentPage < this.totalPages;
  }
}

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
