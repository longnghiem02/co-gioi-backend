import { Controller, Post, Put, Request, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO, ChangePasswordDTO } from './dto';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @Public()
  signUp(@Body() signUpDTO: SignUpDTO) {
    return this.authService.handleSignUp(signUpDTO);
  }

  @Post('sign-in')
  @Public()
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.handleSignIn(signInDTO);
  }

  @Put('change-password')
  changePassword(
    @Request() req: any,
    @Body() changePasswordDTO: ChangePasswordDTO,
  ) {
    return this.authService.handleChangePassword(
      req.account,
      changePasswordDTO,
    );
  }
}
