import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { SecludedDomainService } from './secluded-domain.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import { AddSecludedDomainDTO, UpdateSecludedDomainDTO } from './dto';

@Controller('api')
export class SecludedDomainController {
  constructor(private secludedDomainService: SecludedDomainService) {}

  @Get('get-secluded-domain')
  @Public()
  async getSecludedDomain(@Query() idDTO: IdDTO) {
    return await this.secludedDomainService.handleGetSecludedDomain(idDTO);
  }

  @Get('get-all-secluded-domain')
  @Public()
  async getAllSecludedDomain(@Query() paginateDTO: PaginateDTO) {
    return await this.secludedDomainService.handleGetAllSecludedDomain(
      paginateDTO,
    );
  }

  @Post('add-secluded-domain')
  @Roles(Role.ADMIN)
  async addSecludedDomain(@Body() addSecludedDomainDTO: AddSecludedDomainDTO) {
    return await this.secludedDomainService.handleAddSecludedDomain(
      addSecludedDomainDTO,
    );
  }

  @Put('update-secluded-domain')
  @Roles(Role.ADMIN)
  async updateSecludedDomain(
    @Query() idDTO: IdDTO,
    @Body() updateSecludedDomainDTO: UpdateSecludedDomainDTO,
  ) {
    return await this.secludedDomainService.handleUpdateSecludedDomain(
      idDTO,
      updateSecludedDomainDTO,
    );
  }

  @Delete('delete-secluded-domain')
  @Roles(Role.ADMIN)
  async deleteSecludedDomain(@Query() idDTO: IdDTO) {
    return await this.secludedDomainService.handleDeleteSecludedDomain(idDTO);
  }
}
