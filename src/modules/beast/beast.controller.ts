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
import { BeastService } from './beast.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { AddBeastDTO, UpdateBeastDTO } from './dto';
import { SearchDTO } from 'src/common/dto/search.dto';

@ApiTags('Beast')
@ApiBearerAuth()
@Controller('beast')
export class BeastController {
  constructor(private guService: BeastService) {}

  @Get('get-beast')
  @Public()
  async getBeast(@Query() idDTO: IdDTO) {
    return await this.guService.handleGetBeast(idDTO);
  }

  @Get('get-all-beast')
  @Public()
  async getAllBeast(@Query() paginateDTO: PaginateDTO) {
    return await this.guService.handleGetAllBeast(paginateDTO);
  }

  @Get('search-beast')
  @Public()
  async searchBeast(@Query() searchDTO: SearchDTO) {
    return await this.guService.handleSearchBeast(searchDTO);
  }

  @Post('add-beast')
  @Roles(Role.ADMIN)
  async addBeast(@Body() addBeastDTO: AddBeastDTO) {
    return await this.guService.handleAddBeast(addBeastDTO);
  }

  @Put('update-beast')
  @Roles(Role.ADMIN)
  async updateBeast(
    @Query() idDTO: IdDTO,
    @Body() updateBeastDTO: UpdateBeastDTO,
  ) {
    return await this.guService.handleUpdateBeast(idDTO, updateBeastDTO);
  }

  @Delete('delete-beast')
  @Roles(Role.ADMIN)
  async deleteBeast(@Query() idDTO: IdDTO) {
    return await this.guService.handleDeleteBeast(idDTO);
  }
}
