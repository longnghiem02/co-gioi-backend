import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Request,
  Query,
  Body,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { AccountService } from './account.service';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';
import {
  SignInDTO,
  SignUpDTO,
  ChangePasswordDTO,
  UpdateAccountDTO,
} from './dto';

@Controller('api')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('get-all-account')
  @Roles(Role.ADMIN)
  getAllAccount(@Query() paginateDTO: PaginateDTO) {
    return this.accountService.handleGetAllAccount(paginateDTO);
  }

  @Get('get-account-info')
  @Public()
  getAccountInfo(@Query() idDTO: IdDTO) {
    return this.accountService.handleGetAccountInfo(idDTO);
  }

  @Get('get-my-account-info')
  getMyAccountInfo(@Request() req: any) {
    return this.accountService.handleGetMyAccountInfo(req.account.id);
  }

  @Post('sign-up')
  @Public()
  signUp(@Body() signUpDTO: SignUpDTO) {
    return this.accountService.handleSignUp(signUpDTO);
  }

  @Post('sign-in')
  @Public()
  signIn(@Body() signInDTO: SignInDTO) {
    return this.accountService.handleSignIn(signInDTO);
  }

  @Put('update-account')
  updateAccount(
    @Request() req: any,
    @Body() updateAccountDTO: UpdateAccountDTO,
  ) {
    return this.accountService.handleUpdateAccount(
      req.account,
      updateAccountDTO,
    );
  }

  @Put('change-password')
  changePassword(
    @Request() req: any,
    @Body() changePasswordDTO: ChangePasswordDTO,
  ) {
    return this.accountService.handleChangePassword(
      req.account,
      changePasswordDTO,
    );
  }

  @Delete('delete-account')
  @Roles(Role.ADMIN)
  deleteAccount(@Query() idDTO: IdDTO) {
    return this.accountService.handleDeleteAccount(idDTO);
  }
}
