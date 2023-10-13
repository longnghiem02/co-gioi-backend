import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { BlandGheavenService } from './bland-gheaven.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { AddBlandGheavenDTO, UpdateBlandGheavenDTO } from './dto';

@Controller('api')
export class BlandGheavenController {
  constructor(private blandGheavenService: BlandGheavenService) {}

  @Get('get-bland-gheaven')
  @Public()
  async getBlandGheaven(@Query() idDTO: IdDTO) {
    return await this.blandGheavenService.handleGetBlandGheaven(idDTO);
  }

  @Get('get-all-bland-gheaven')
  @Public()
  async getAllBlandGheaven(@Query() paginateDTO: PaginateDTO) {
    return await this.blandGheavenService.handleGetAllBlandGheaven(paginateDTO);
  }

  @Post('add-bland-gheaven')
  @Roles(Role.ADMIN)
  async addBlandGheaven(@Body() addBlandGheavenDTO: AddBlandGheavenDTO) {
    return await this.blandGheavenService.handleAddBlandGheaven(
      addBlandGheavenDTO,
    );
  }

  @Put('update-bland-gheaven')
  @Roles(Role.ADMIN)
  async updateBlandGheaven(
    @Query() idDTO: IdDTO,
    @Body() updateBlandGheavenDTO: UpdateBlandGheavenDTO,
  ) {
    return await this.blandGheavenService.handleUpdateBlandGheaven(
      idDTO,
      updateBlandGheavenDTO,
    );
  }

  @Delete('delete-bland-gheaven')
  @Roles(Role.ADMIN)
  async deleteBlandGheaven(@Query() idDTO: IdDTO) {
    return await this.blandGheavenService.handleDeleteBlandGheaven(idDTO);
  }
}
