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
import { SecludedDomainService } from './secluded-domain.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { FilterDTO, IdDTO, PaginateDTO } from 'src/common/dto/';
import { AddSecludedDomainDTO, UpdateSecludedDomainDTO } from './dto';

@ApiTags('Secluded domain')
@ApiBearerAuth()
@Controller('secluded-domain')
export class SecludedDomainController {
  constructor(private secludedDomainService: SecludedDomainService) {}

  @Get('get')
  @Public()
  async getSecludedDomain(@Query() idDTO: IdDTO) {
    return await this.secludedDomainService.handleGetSecludedDomain(idDTO);
  }

  @Get('get-all')
  @Public()
  async getAllSecludedDomain(
    @Query() filterDTO: FilterDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.secludedDomainService.handleGetAllSecludedDomain(
      filterDTO,
      paginateDTO,
    );
  }

  @Post('add')
  @Roles(Role.ADMIN)
  async addSecludedDomain(@Body() addSecludedDomainDTO: AddSecludedDomainDTO) {
    return await this.secludedDomainService.handleAddSecludedDomain(
      addSecludedDomainDTO,
    );
  }

  @Put('update/:id')
  @Roles(Role.ADMIN)
  async updateSecludedDomain(
    @Param() idDTO: IdDTO,
    @Body() updateSecludedDomainDTO: UpdateSecludedDomainDTO,
  ) {
    return await this.secludedDomainService.handleUpdateSecludedDomain(
      idDTO,
      updateSecludedDomainDTO,
    );
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  async deleteSecludedDomain(@Param() idDTO: IdDTO) {
    return await this.secludedDomainService.handleDeleteSecludedDomain(idDTO);
  }
}
