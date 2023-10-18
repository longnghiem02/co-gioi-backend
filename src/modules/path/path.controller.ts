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

  @Get('get-path')
  @Public()
  async getPath(@Query() idDTO: IdDTO) {
    return await this.pathService.handleGetPath(idDTO);
  }

  @Get('get-all-path')
  @Public()
  async getAllPath(@Query() paginateDTO: PaginateDTO) {
    return await this.pathService.handleGetAllPath(paginateDTO);
  }

  @Get('get-all-path-name')
  @Roles(Role.ADMIN)
  async getAllPathName() {
    return await this.pathService.handleGetAllPathName();
  }

  @Get('search-path')
  @Public()
  async searchGu(
    @Query() searchDTO: SearchDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.pathService.handleSearchPath(searchDTO, paginateDTO);
  }

  @Post('add-path')
  @Roles(Role.ADMIN)
  async addPath(@Body() addPathDTO: AddPathDTO) {
    return await this.pathService.handleAddPath(addPathDTO);
  }

  @Put('update-path/:id')
  @Roles(Role.ADMIN)
  async updatePath(
    @Param() idDTO: IdDTO,
    @Body() updatePathDTO: UpdatePathDTO,
  ) {
    return await this.pathService.handleUpdatePath(idDTO, updatePathDTO);
  }

  @Delete('delete-path/:id')
  @Roles(Role.ADMIN)
  async deletePath(@Param() idDTO: IdDTO) {
    return await this.pathService.handleDeletePath(idDTO);
  }
}
