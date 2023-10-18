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
import { OtherInfoService } from './other-info.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { FilterDTO, IdDTO, PaginateDTO } from 'src/common/dto/';
import { AddOtherInfoDTO, FilterOtherInfoDTO, UpdateOtherInfoDTO } from './dto';

@ApiTags('Other info')
@ApiBearerAuth()
@Controller('other-info')
export class OtherInfoController {
  constructor(private otherInfoService: OtherInfoService) {}

  @Get('get-other-info')
  @Public()
  async getOtherInfo(@Query() idDTO: IdDTO) {
    return await this.otherInfoService.handleGetOtherInfo(idDTO);
  }

  @Get('get-all-other-info')
  @Public()
  async getAllOtherInfo(
    @Query() filterDTO: FilterDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.otherInfoService.handleGetAllOtherInfo(
      filterDTO,
      paginateDTO,
    );
  }

  @Get('get-all-other-info-name')
  @Roles(Role.ADMIN)
  async getAllOtherInfoName(@Query() filterOtherInfoDTO: FilterOtherInfoDTO) {
    return await this.otherInfoService.handleGetAllOtherInfoName(
      filterOtherInfoDTO,
    );
  }

  @Post('add-other-info')
  @Roles(Role.ADMIN)
  async addOtherInfo(@Body() addOtherInfoDTO: AddOtherInfoDTO) {
    return await this.otherInfoService.handleAddOtherInfo(addOtherInfoDTO);
  }

  @Put('update-other-info/:id')
  @Roles(Role.ADMIN)
  async updateOtherInfo(
    @Param() idDTO: IdDTO,
    @Body() updateOtherInfoDTO: UpdateOtherInfoDTO,
  ) {
    return await this.otherInfoService.handleUpdateOtherInfo(
      idDTO,
      updateOtherInfoDTO,
    );
  }

  @Delete('delete-other-info/:id')
  @Roles(Role.ADMIN)
  async deleteOtherInfo(@Param() idDTO: IdDTO) {
    return await this.otherInfoService.handleDeleteOtherInfo(idDTO);
  }
}
