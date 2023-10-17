import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { GuHouseService } from './gu-house.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { AddGuHouseDTO, UpdateGuHouseDTO } from './dto';
import { SearchDTO } from 'src/common/dto/search.dto';

@Controller('api')
export class GuHouseController {
  constructor(private guHouseService: GuHouseService) {}

  @Get('get-gu-house')
  @Public()
  async getGuHouse(@Query() idDTO: IdDTO) {
    return await this.guHouseService.handleGetGuHouse(idDTO);
  }

  @Get('get-all-gu-house')
  @Public()
  async getAllGuHouse(@Query() paginateDTO: PaginateDTO) {
    return await this.guHouseService.handleGetAllGuHouse(paginateDTO);
  }

  @Get('search-gu-house')
  @Public()
  async searchGuHouse(@Query() searchDTO: SearchDTO) {
    return await this.guHouseService.handleSearchGuHouse(searchDTO);
  }

  @Post('add-gu-house')
  @Roles(Role.ADMIN)
  async addGuHouse(@Body() addGuHouseDTO: AddGuHouseDTO) {
    return await this.guHouseService.handleAddGuHouse(addGuHouseDTO);
  }

  @Put('update-gu-house')
  @Roles(Role.ADMIN)
  async updateGuHouse(
    @Query() idDTO: IdDTO,
    @Body() updateGuHouseDTO: UpdateGuHouseDTO,
  ) {
    return await this.guHouseService.handleUpdateGuHouse(
      idDTO,
      updateGuHouseDTO,
    );
  }

  @Delete('delete-gu-house')
  @Roles(Role.ADMIN)
  async deleteGuHouse(@Query() idDTO: IdDTO) {
    return await this.guHouseService.handleDeleteGuHouse(idDTO);
  }
}
