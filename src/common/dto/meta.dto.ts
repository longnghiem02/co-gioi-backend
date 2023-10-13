import { IsBoolean, IsNumber } from 'class-validator';

export class MetaDTO {
  @IsNumber()
  totalItem: number;

  @IsNumber()
  itemPerPage: number;

  @IsNumber()
  currentPage: number;

  @IsNumber()
  totalPage: number;

  @IsBoolean()
  hasPreviousPage: boolean;

  @IsBoolean()
  hasNextPage: boolean;

  constructor(totalItem: number, itemPerPage: number, currentPage: number) {
    this.totalItem = totalItem;
    this.itemPerPage = itemPerPage;
    this.currentPage = currentPage;
    this.totalPage = Math.ceil(this.totalItem / this.itemPerPage);
    this.hasPreviousPage = this.currentPage > 1;
    this.hasNextPage = this.currentPage < this.totalPage;
  }
}
