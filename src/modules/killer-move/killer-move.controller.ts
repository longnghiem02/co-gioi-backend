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
import { KillerMoveService } from './killer-move.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO, SearchDTO, PaginateDTO, FilterDTO } from 'src/common/dto';
import { AddKillerMoveDTO, UpdateKillerMoveDTO } from './dto';

@ApiTags('Killer move')
@ApiBearerAuth()
@Controller('killer-move')
export class KillerMoveController {
  constructor(private guService: KillerMoveService) {}

  @Get('get')
  @Public()
  async getKillerMove(@Query() idDTO: IdDTO) {
    return await this.guService.handleGetKillerMove(idDTO);
  }

  @Get('get-all')
  @Public()
  async getAllKillerMove(
    @Query() filterDTO: FilterDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.guService.handleGetAllKillerMove(filterDTO, paginateDTO);
  }

  @Get('search')
  @Public()
  async searchKillerMove(
    @Query() searchDTO: SearchDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.guService.handleSearchKillerMove(searchDTO, paginateDTO);
  }

  @Post('add')
  @Roles(Role.ADMIN)
  async addKillerMove(@Body() addKillerMoveDTO: AddKillerMoveDTO) {
    return await this.guService.handleAddKillerMove(addKillerMoveDTO);
  }

  @Put('update/:id')
  @Roles(Role.ADMIN)
  async updateKillerMove(
    @Param() idDTO: IdDTO,
    @Body() updateKillerMoveDTO: UpdateKillerMoveDTO,
  ) {
    return await this.guService.handleUpdateKillerMove(
      idDTO,
      updateKillerMoveDTO,
    );
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  async deleteKillerMove(@Param() idDTO: IdDTO) {
    return await this.guService.handleDeleteKillerMove(idDTO);
  }
}
