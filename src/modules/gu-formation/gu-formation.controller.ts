import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { GuFormationService } from './gu-formation.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { AddGuFormationDTO, UpdateGuFormationDTO } from './dto';
import { SearchDTO } from 'src/common/dto/search.dto';

@Controller('api')
export class GuFormationController {
  constructor(private guFormationService: GuFormationService) {}

  @Get('get-gu-formation')
  @Public()
  async getGuFormation(@Query() idDTO: IdDTO) {
    return await this.guFormationService.handleGetGuFormation(idDTO);
  }

  @Get('get-all-gu-formation')
  @Public()
  async getAllGuFormation(@Query() paginateDTO: PaginateDTO) {
    return await this.guFormationService.handleGetAllGuFormation(paginateDTO);
  }

  @Get('search-gu-formation')
  @Public()
  async searchGuFormation(@Query() searchDTO: SearchDTO) {
    return await this.guFormationService.handleSearchGuFormation(searchDTO);
  }

  @Post('add-gu-formation')
  @Roles(Role.ADMIN)
  async addGuFormation(@Body() addGuFormationDTO: AddGuFormationDTO) {
    return await this.guFormationService.handleAddGuFormation(
      addGuFormationDTO,
    );
  }

  @Put('update-gu-formation')
  @Roles(Role.ADMIN)
  async updateGuFormation(
    @Query() idDTO: IdDTO,
    @Body() updateGuFormationDTO: UpdateGuFormationDTO,
  ) {
    return await this.guFormationService.handleUpdateGuFormation(
      idDTO,
      updateGuFormationDTO,
    );
  }

  @Delete('delete-gu-formation')
  @Roles(Role.ADMIN)
  async deleteGuFormation(@Query() idDTO: IdDTO) {
    return await this.guFormationService.handleDeleteGuFormation(idDTO);
  }
}
