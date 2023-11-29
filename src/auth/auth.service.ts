import {
  Injectable,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from 'src/modules/account/model/account.model';
import { HttpResponse } from 'src/common/dto/http-response.dto';
import { PasswordService } from 'src/auth/service/password.service';
import {
  AccountMessage,
  AuthMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async handleSignUp(data: any): Promise<HttpResponse> {
    try {
      const checkEmail = await this.accountRepository.findOneBy({
        email: data.email,
      });
      if (checkEmail) {
        throw new BadRequestException(AccountMessage.EMAIL_HAS_BEEN_USED);
      } else {
        const hashPassword = await this.passwordService.hashPassword(
          data.password,
        );
        await this.accountRepository.save({
          username: data.username,
          email: data.email,
          password: hashPassword,
        });
        return new HttpResponse(
          HttpStatus.CREATED,
          AuthMessage.SIGN_UP_SUCCEED,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async handleSignIn(data: any): Promise<HttpResponse> {
    try {
      const account = await this.accountRepository.findOne({
        where: { email: data.email },
        relations: { role: true },
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
          role: {
            name: true,
          },
        },
      });
      if (!account) {
        throw new NotFoundException(AccountMessage.ACCOUNT_NOT_FOUND);
      }
      const checkPassword = await this.passwordService.comparePassword(
        data.password,
        account.password,
      );
      if (!checkPassword) {
        throw new BadRequestException(AuthMessage.WRONG_PASSWORD);
      } else {
        const payload = {
          id: account.id,
          username: account.username,
          email: account.email,
          role: account.role.name,
        };
        const access_token = await this.jwtService.signAsync(payload);
        return new HttpResponse(
          HttpStatus.OK,
          AuthMessage.SIGN_IN_SUCCEED,
          access_token,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async handleChangePassword(account: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.accountRepository.findOneBy({
        id: account.id,
      });
      if (result) {
        const checkPassword = await this.passwordService.comparePassword(
          data.currentPassword,
          result.password,
        );
        if (checkPassword) {
          const hashPassword = await this.passwordService.hashPassword(
            data.newPassword,
          );
          await this.accountRepository.update(account.id, {
            password: hashPassword,
          });
          return new HttpResponse(
            HttpStatus.CREATED,
            AccountMessage.UPDATE_ACCOUNT_SUCCEED,
          );
        } else {
          throw new BadRequestException(AuthMessage.WRONG_PASSWORD);
        }
      } else {
        throw new NotFoundException(AccountMessage.ACCOUNT_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }
}
