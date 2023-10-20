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

  @Get('get-all')
  @Roles(Role.ADMIN)
  getAllAccount(@Query() paginateDTO: PaginateDTO) {
    return this.accountService.handleGetAllAccount(paginateDTO);
  }

  @Get('get-info')
  @Public()
  getAccountInfo(@Query() idDTO: IdDTO) {
    return this.accountService.handleGetAccountInfo(idDTO);
  }

  @Get('get-my-info')
  getMyAccountInfo(@Request() req: any) {
    return this.accountService.handleGetMyAccountInfo(req.account.id);
  }

  @Put('update')
  updateAccount(
    @Request() req: any,
    @Body() updateAccountDTO: UpdateAccountDTO,
  ) {
    return this.accountService.handleUpdateAccount(
      req.account,
      updateAccountDTO,
    );
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  deleteAccount(@Param() idDTO: IdDTO) {
    return this.accountService.handleDeleteAccount(idDTO);
  }
}
