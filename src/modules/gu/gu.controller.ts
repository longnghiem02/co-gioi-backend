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
import { GuService } from './gu.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO } from 'src/common/dto';
import { AddGuDTO, UpdateGuDTO, FilterGuDTO } from './dto';

@ApiTags('Gu')
@ApiBearerAuth()
@Controller('gu')
export class GuController {
  constructor(private guService: GuService) {}

  @Get(':id')
  @Public()
  async getGu(@Param() idDTO: IdDTO) {
    return await this.guService.getGu(idDTO);
  }

  @Get('')
  @Public()
  async getAllGu(@Query() filterGuDTO: FilterGuDTO) {
    return await this.guService.getAllGu(filterGuDTO);
  }

  @Post('')
  @Roles(Role.ADMIN)
  async addGu(@Body() addGuDTO: AddGuDTO) {
    return await this.guService.addGu(addGuDTO);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async updateGu(@Param() idDTO: IdDTO, @Body() updateGuDTO: UpdateGuDTO) {
    return await this.guService.updateGu(idDTO, updateGuDTO);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteGu(@Param() idDTO: IdDTO) {
    return await this.guService.deleteGu(idDTO);
  }
}
