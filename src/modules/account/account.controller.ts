import {
  Controller,
  Get,
  Put,
  Delete,
  Request,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { AccountService } from './account.service';
import { IdDTO, PaginateDTO } from 'src/common/dto';
import { UpdateAccountDTO } from './dto';

@ApiTags('Account')
@ApiBearerAuth()
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('')
  @Roles(Role.ADMIN)
  async getAllAccount(@Query() paginateDTO: PaginateDTO) {
    return await this.accountService.getAllAccount(paginateDTO);
  }

  @Get(':id')
  @Public()
  async getAccountInfo(@Param() idDTO: IdDTO) {
    return await this.accountService.getAccountInfo(idDTO);
  }

  @Get('me')
  async getMyAccountInfo(@Request() req: any) {
    return await this.accountService.getMyAccountInfo(req.account.id);
  }

  @Put('')
  async updateAccount(
    @Request() req: any,
    @Body() updateAccountDTO: UpdateAccountDTO,
  ) {
    return await this.accountService.updateAccount(
      req.account,
      updateAccountDTO,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteAccount(@Param() idDTO: IdDTO) {
    return await this.accountService.deleteAccount(idDTO);
  }
}
