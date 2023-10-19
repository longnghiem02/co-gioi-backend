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
import { BlandGheavenService } from './bland-gheaven.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO, FilterDTO, PaginateDTO } from 'src/common/dto';
import { AddBlandGheavenDTO, UpdateBlandGheavenDTO } from './dto';

@ApiTags('Blessed land - Grotto heaven')
@ApiBearerAuth()
@Controller('bland-gheaven')
export class BlandGheavenController {
  constructor(private blandGheavenService: BlandGheavenService) {}

  @Get('get')
  @Public()
  async getBlandGheaven(@Query() idDTO: IdDTO) {
    return await this.blandGheavenService.handleGetBlandGheaven(idDTO);
  }

  @Get('get-all')
  @Public()
  async getAllBlandGheaven(
    @Query() filterDTO: FilterDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.blandGheavenService.handleGetAllBlandGheaven(
      filterDTO,
      paginateDTO,
    );
  }

  @Post('add')
  @Roles(Role.ADMIN)
  async addBlandGheaven(@Body() addBlandGheavenDTO: AddBlandGheavenDTO) {
    return await this.blandGheavenService.handleAddBlandGheaven(
      addBlandGheavenDTO,
    );
  }

  @Put('update/:id')
  @Roles(Role.ADMIN)
  async updateBlandGheaven(
    @Param() idDTO: IdDTO,
    @Body() updateBlandGheavenDTO: UpdateBlandGheavenDTO,
  ) {
    return await this.blandGheavenService.handleUpdateBlandGheaven(
      idDTO,
      updateBlandGheavenDTO,
    );
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  async deleteBlandGheaven(@Param() idDTO: IdDTO) {
    return await this.blandGheavenService.handleDeleteBlandGheaven(idDTO);
  }
}
