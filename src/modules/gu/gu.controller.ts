import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GuService } from './gu.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO, SearchDTO, PaginateDTO, FilterDTO } from 'src/common/dto';
import { AddGuDTO, UpdateGuDTO } from './dto';

@ApiTags('Gu')
@ApiBearerAuth()
@Controller('gu')
export class GuController {
  constructor(private guService: GuService) {}

  @Get('get-gu')
  @Public()
  async getGu(@Query() idDTO: IdDTO) {
    return await this.guService.handleGetGu(idDTO);
  }

  @Get('get-all-gu')
  @Public()
  async getAllGu(
    @Query() filterDTO: FilterDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.guService.handleGetAllGu(filterDTO, paginateDTO);
  }

  @Get('search-gu')
  @Public()
  async searchGu(
    @Query() searchDTO: SearchDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.guService.handleSearchGu(searchDTO, paginateDTO);
  }

  @Post('add-gu')
  @Roles(Role.ADMIN)
  async addGu(@Body() addGuDTO: AddGuDTO) {
    return await this.guService.handleAddGu(addGuDTO);
  }

  @Put('update-gu/:id')
  @Roles(Role.ADMIN)
  async updateGu(@Param() idDTO: IdDTO, @Body() updateGuDTO: UpdateGuDTO) {
    return await this.guService.handleUpdateGu(idDTO, updateGuDTO);
  }

  @Delete('delete-gu/:id')
  @Roles(Role.ADMIN)
  async deleteGu(@Param() idDTO: IdDTO) {
    return await this.guService.handleDeleteGu(idDTO);
  }
}
