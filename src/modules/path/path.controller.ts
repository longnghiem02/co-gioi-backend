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
import { PathService } from './path.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { AddPathDTO, UpdatePathDTO } from './dto';
import { SearchDTO } from 'src/common/dto/search.dto';

@ApiTags('Path')
@ApiBearerAuth()
@Controller('path')
export class PathController {
  constructor(private pathService: PathService) {}

  @Get('get')
  @Public()
  async getPath(@Query() idDTO: IdDTO) {
    return await this.pathService.handleGetPath(idDTO);
  }

  @Get('get-all')
  @Public()
  async getAllPath(@Query() paginateDTO: PaginateDTO) {
    return await this.pathService.handleGetAllPath(paginateDTO);
  }

  @Get('get-all-name')
  @Public()
  async getAllPathName() {
    return await this.pathService.handleGetAllPathName();
  }

  @Get('search')
  @Public()
  async searchGu(
    @Query() searchDTO: SearchDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.pathService.handleSearchPath(searchDTO, paginateDTO);
  }

  @Post('add')
  @Roles(Role.ADMIN)
  async addPath(@Body() addPathDTO: AddPathDTO) {
    return await this.pathService.handleAddPath(addPathDTO);
  }

  @Put('update/:id')
  @Roles(Role.ADMIN)
  async updatePath(
    @Param() idDTO: IdDTO,
    @Body() updatePathDTO: UpdatePathDTO,
  ) {
    return await this.pathService.handleUpdatePath(idDTO, updatePathDTO);
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  async deletePath(@Param() idDTO: IdDTO) {
    return await this.pathService.handleDeletePath(idDTO);
  }
}
