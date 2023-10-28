import { IsBoolean, IsNumber } from 'class-validator';

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
