import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from 'src/modules/account/model/account.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { PasswordService } from 'src/auth/service/password.service';
import {
  CommonMessage,
  ErrorMessage,
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
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.EMAIL_HAS_BEEN_USED,
        );
      } else {
        const hashPassword = await this.passwordService.hashPassword(
          data.password,
        );
        await this.accountRepository.save({
          username: data.username,
          email: data.email,
          password: hashPassword,
        });
        return HttpResponse(
          HttpStatus.CREATED,
          CommonMessage.CREATE_ACCOUNT_SUCCEED,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
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
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.ACCOUNT_NOT_FOUND,
        );
      }
      const checkPassword = await this.passwordService.comparePassword(
        data.password,
        account.password,
      );
      if (!checkPassword) {
        return HttpResponse(
          HttpStatus.UNAUTHORIZED,
          ErrorMessage.WRONG_PASSWORD,
        );
      } else {
        const payload = {
          id: account.id,
          username: account.username,
          email: account.email,
          role: account.role.name,
        };
        const access_token = await this.jwtService.signAsync(payload);
        return HttpResponse(HttpStatus.OK, '', access_token);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
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
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_ACCOUNT_SUCCEED,
          );
        } else {
          return HttpResponse(
            HttpStatus.UNAUTHORIZED,
            ErrorMessage.WRONG_PASSWORD,
          );
        }
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.ACCOUNT_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
