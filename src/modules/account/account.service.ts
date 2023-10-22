import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Account } from './model/account.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async handleGetAllAccount(paginate: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.accountRepository.findAndCount({
        order: { username: 'ASC' },
        take: paginate.take,
        skip: (paginate.page - 1) * paginate.take,
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

      const result = new PageDTO(
        data,
        new MetaDTO(count, paginate.take, paginate.page),
      );

      if (result) {
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
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

  async handleGetAccountInfo(query: any): Promise<HttpResponse> {
    try {
      const result = await this.accountRepository.findOne({
        where: { id: query.id },
        select: {
          username: true,
          email: true,
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
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
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
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
          await this.accountRepository.update(account.id, data);
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_ACCOUNT_SUCCEED,
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
          CommonMessage.DELETE_ACCOUNT_SUCCEED,
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
