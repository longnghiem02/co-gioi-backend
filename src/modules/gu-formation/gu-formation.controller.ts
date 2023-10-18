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
import { GuFormationService } from './gu-formation.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO, SearchDTO, PaginateDTO, FilterDTO } from 'src/common/dto';
import { AddGuFormationDTO, UpdateGuFormationDTO } from './dto';

@ApiTags('Gu formation')
@ApiBearerAuth()
@Controller('gu-formation')
export class GuFormationController {
  constructor(private guFormationService: GuFormationService) {}

  @Get('get-gu-formation')
  @Public()
  async getGuFormation(@Query() idDTO: IdDTO) {
    return await this.guFormationService.handleGetGuFormation(idDTO);
  }

  @Get('get-all-gu-formation')
  @Public()
  async getAllGuFormation(
    @Query() filterDTO: FilterDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.guFormationService.handleGetAllGuFormation(
      filterDTO,
      paginateDTO,
    );
  }

  @Get('search-gu-formation')
  @Public()
  async searchGuFormation(
    @Query() searchDTO: SearchDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.guFormationService.handleSearchGuFormation(
      searchDTO,
      paginateDTO,
    );
  }

  @Post('add-gu-formation')
  @Roles(Role.ADMIN)
  async addGuFormation(@Body() addGuFormationDTO: AddGuFormationDTO) {
    return await this.guFormationService.handleAddGuFormation(
      addGuFormationDTO,
    );
  }

  @Put('update-gu-formation/:id')
  @Roles(Role.ADMIN)
  async updateGuFormation(
    @Param() idDTO: IdDTO,
    @Body() updateGuFormationDTO: UpdateGuFormationDTO,
  ) {
    return await this.guFormationService.handleUpdateGuFormation(
      idDTO,
      updateGuFormationDTO,
    );
  }

  @Delete('delete-gu-formation/:id')
  @Roles(Role.ADMIN)
  async deleteGuFormation(@Param() idDTO: IdDTO) {
    return await this.guFormationService.handleDeleteGuFormation(idDTO);
  }
}
