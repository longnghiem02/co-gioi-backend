import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { OtherInfoService } from './other-info.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { AddOtherInfoDTO, FilterOtherInfoDTO, UpdateOtherInfoDTO } from './dto';

@Controller('api')
export class OtherInfoController {
  constructor(private otherInfoService: OtherInfoService) {}

  @Get('get-other-info')
  @Public()
  async getOtherInfo(@Query() idDTO: IdDTO) {
    return await this.otherInfoService.handleGetOtherInfo(idDTO);
  }

  @Get('get-all-other-info')
  @Public()
  async getAllOtherInfo(@Query() paginateDTO: PaginateDTO) {
    return await this.otherInfoService.handleGetAllOtherInfo(paginateDTO);
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

  @Put('update-other-info')
  @Roles(Role.ADMIN)
  async updateOtherInfo(
    @Query() idDTO: IdDTO,
    @Body() updateOtherInfoDTO: UpdateOtherInfoDTO,
  ) {
    return await this.otherInfoService.handleUpdateOtherInfo(
      idDTO,
      updateOtherInfoDTO,
    );
  }

  @Delete('delete-other-info')
  @Roles(Role.ADMIN)
  async deleteOtherInfo(@Query() idDTO: IdDTO) {
    return await this.otherInfoService.handleDeleteOtherInfo(idDTO);
  }
}
