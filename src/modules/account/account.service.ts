import {
  Injectable,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Account } from './model/account.model';
import { PageDTO, MetaDTO } from 'src/common/dto';
import { HttpResponse } from 'src/common/dto/http-response.dto';
import {
  CommonMessage,
  AccountMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async getAllAccount(paginate: any): Promise<HttpResponse> {
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
        return new HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        throw new NotFoundException(AccountMessage.ACCOUNT_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async getAccountInfo(param: any): Promise<HttpResponse> {
    try {
      const result = await this.accountRepository.findOne({
        where: { id: param.id },
        select: {
          username: true,
          email: true,
        },
      });
      if (result) {
        return new HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        throw new NotFoundException(AccountMessage.ACCOUNT_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async getMyAccountInfo(id: number): Promise<HttpResponse> {
    try {
      const result = await this.accountRepository.findOne({
        where: { id: id },
        select: {
          username: true,
          email: true,
        },
      });
      if (result) {
        return new HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        throw new NotFoundException(AccountMessage.ACCOUNT_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async updateAccount(account: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.accountRepository.findOneBy({
        id: account.id,
      });
      if (result) {
        const check = await this.accountRepository.findOne({
          where: { id: Not(account.id), email: data.email },
        });
        if (check) {
          throw new BadRequestException(AccountMessage.EMAIL_HAS_BEEN_USED);
        } else {
          await this.accountRepository.update(account.id, data);
          return new HttpResponse(
            HttpStatus.CREATED,
            AccountMessage.UPDATE_ACCOUNT_SUCCEED,
          );
        }
      } else {
        throw new NotFoundException(AccountMessage.ACCOUNT_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteAccount(param: any): Promise<HttpResponse> {
    try {
      const result = await this.accountRepository.findOneBy({
        id: param.id,
      });
      if (result) {
        await this.accountRepository.delete(param.id);
        return new HttpResponse(
          HttpStatus.OK,
          AccountMessage.DELETE_ACCOUNT_SUCCEED,
        );
      } else {
        throw new NotFoundException(AccountMessage.ACCOUNT_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }
}
