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
import { GuHouseService } from './gu-house.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO, SearchDTO, PaginateDTO, FilterDTO } from 'src/common/dto';
import { AddGuHouseDTO, UpdateGuHouseDTO } from './dto';

@ApiTags('Gu house')
@ApiBearerAuth()
@Controller('gu-house')
export class GuHouseController {
  constructor(private guHouseService: GuHouseService) {}

  @Get('get-gu-house')
  @Public()
  async getGuHouse(@Query() idDTO: IdDTO) {
    return await this.guHouseService.handleGetGuHouse(idDTO);
  }

  @Get('get-all-gu-house')
  @Public()
  async getAllGuHouse(
    @Query() filterDTO: FilterDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.guHouseService.handleGetAllGuHouse(
      filterDTO,
      paginateDTO,
    );
  }

  @Get('search-gu-house')
  @Public()
  async searchGuHouse(
    @Query() searchDTO: SearchDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.guHouseService.handleSearchGuHouse(
      searchDTO,
      paginateDTO,
    );
  }

  @Post('add-gu-house')
  @Roles(Role.ADMIN)
  async addGuHouse(@Body() addGuHouseDTO: AddGuHouseDTO) {
    return await this.guHouseService.handleAddGuHouse(addGuHouseDTO);
  }

  @Put('update-gu-house/:id')
  @Roles(Role.ADMIN)
  async updateGuHouse(
    @Param() idDTO: IdDTO,
    @Body() updateGuHouseDTO: UpdateGuHouseDTO,
  ) {
    return await this.guHouseService.handleUpdateGuHouse(
      idDTO,
      updateGuHouseDTO,
    );
  }

  @Delete('delete-gu-house/:id')
  @Roles(Role.ADMIN)
  async deleteGuHouse(@Param() idDTO: IdDTO) {
    return await this.guHouseService.handleDeleteGuHouse(idDTO);
  }
}
