import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GuService } from './gu.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { AddGuDTO, UpdateGuDTO } from './dto';
import { SearchDTO } from 'src/common/dto/search.dto';

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
  async getAllGu(@Query() paginateDTO: PaginateDTO) {
    return await this.guService.handleGetAllGu(paginateDTO);
  }

  @Get('search-gu')
  @Public()
  async searchGu(@Query() searchDTO: SearchDTO) {
    return await this.guService.handleSearchGu(searchDTO);
  }

  @Post('add-gu')
  @Roles(Role.ADMIN)
  async addGu(@Body() addGuDTO: AddGuDTO) {
    return await this.guService.handleAddGu(addGuDTO);
  }

  @Put('update-gu')
  @Roles(Role.ADMIN)
  async updateGu(@Query() idDTO: IdDTO, @Body() updateGuDTO: UpdateGuDTO) {
    return await this.guService.handleUpdateGu(idDTO, updateGuDTO);
  }

  @Delete('delete-gu')
  @Roles(Role.ADMIN)
  async deleteGu(@Query() idDTO: IdDTO) {
    return await this.guService.handleDeleteGu(idDTO);
  }
}
