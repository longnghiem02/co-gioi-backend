import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Account } from './model/account.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import { PasswordService } from 'src/auth/password.service';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async handleGetAllAccount(param: any): Promise<HttpResponse> {
    try {
      const data = await this.accountRepository.findAndCount({
        order: { username: 'ASC' },
        take: param.take,
        skip: (param.page - 1) * param.take,
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

      const meta = new MetaDTO(data[1], param.take, param.page);
      const result = new PageDTO(data[0], meta);

      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
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

  async handleGetAccountInfo(param: any): Promise<HttpResponse> {
    try {
      const result = await this.accountRepository.findOne({
        where: { id: param.id },
        select: {
          username: true,
          email: true,
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
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

  async handleGetMyAccountInfo(id: number): Promise<HttpResponse> {
    try {
      const result = await this.accountRepository.findOne({
        where: { id: id },
        select: {
          username: true,
          email: true,
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
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
          CommonMessage.CREATE_ACCOUNT_SUCCCEED,
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

  async handleUpdateAccount(account: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.accountRepository.findOneBy({
        id: account.id,
      });
      if (result) {
        const check = await this.accountRepository.findOne({
          where: { id: Not(account.id), email: data.email },
        });
        if (check) {
          return HttpResponse(
            HttpStatus.BAD_REQUEST,
            ErrorMessage.EMAIL_HAS_BEEN_USED,
          );
        } else {
          await this.accountRepository.update(account.id, {
            ...data,
            updatedAt: new Date(),
          });
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_ACCOUNT_SUCCCEED,
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
            updatedAt: new Date(),
          });
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_ACCOUNT_SUCCCEED,
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

  async handleDeleteAccount(param: any): Promise<HttpResponse> {
    try {
      const result = await this.accountRepository.findOneBy({
        id: param.id,
      });
      if (result) {
        await this.accountRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.OK,
          CommonMessage.DELETE_ACCOUNT_SUCCCEED,
        );
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
