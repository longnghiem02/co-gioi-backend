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
import { AddPathDTO, FilterPathDTO, UpdatePathDTO } from './dto';

@ApiTags('Path')
@ApiBearerAuth()
@Controller('path')
export class PathController {
  constructor(private pathService: PathService) {}

  @Get(':id')
  @Public()
  async getPath(@Param() idDTO: IdDTO) {
    return await this.pathService.getPath(idDTO);
  }

  @Get('')
  @Public()
  async getAllPath(@Query() filterPathDTO: FilterPathDTO) {
    return await this.pathService.getAllPath(filterPathDTO);
  }

  @Get('/all/name')
  @Public()
  async getAllPathName() {
    return await this.pathService.getAllPathName();
  }

  @Post('')
  @Roles(Role.ADMIN)
  async addPath(@Body() addPathDTO: AddPathDTO) {
    return await this.pathService.addPath(addPathDTO);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async updatePath(
    @Param() idDTO: IdDTO,
    @Body() updatePathDTO: UpdatePathDTO,
  ) {
    return await this.pathService.updatePath(idDTO, updatePathDTO);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deletePath(@Param() idDTO: IdDTO) {
    return await this.pathService.deletePath(idDTO);
  }
}
