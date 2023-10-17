import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import { SecludedDomain } from './model/secluded-domain.model';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class SecludedDomainService {
  constructor(
    @InjectRepository(SecludedDomain)
    private secludedDomainRepository: Repository<SecludedDomain>,
  ) {}

  async handleGetSecludedDomain(param: any): Promise<HttpResponse> {
    try {
      const result = await this.secludedDomainRepository.findOne({
        where: { id: param.id },
        relations: { path: true },
        select: {
          id: true,
          name: true,
          description: true,
          detail: true,
          path: {
            id: true,
            name: true,
          },
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.SECLUDED_DOMAIN_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllSecludedDomain(param: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.secludedDomainRepository.findAndCount({
        where: { pathId: param.path ? param.path : null },
        order: { name: 'ASC' },
        take: param.take,
        skip: (param.page - 1) * param.take,
        select: {
          id: true,
          name: true,
        },
      });

      const result = new PageDTO(
        data,
        new MetaDTO(count, param.take, param.page),
      );

      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.SECLUDED_DOMAIN_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddSecludedDomain(data: any): Promise<HttpResponse> {
    try {
      const check = await this.secludedDomainRepository.findOneBy({
        name: data.name,
      });
      if (check) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.SECLUDED_DOMAIN_EXISTS,
        );
      } else {
        await this.secludedDomainRepository.save(data);
        return HttpResponse(
          HttpStatus.CREATED,
          CommonMessage.ADD_SECLUDED_DOMAIN_SUCCEED,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateSecludedDomain(
    param: any,
    data: any,
  ): Promise<HttpResponse> {
    try {
      const result = await this.secludedDomainRepository.findOneBy({
        id: param.id,
      });
      if (!result) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.SECLUDED_DOMAIN_NOT_FOUND,
        );
      } else {
        const check = await this.secludedDomainRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          return HttpResponse(
            HttpStatus.BAD_REQUEST,
            ErrorMessage.SECLUDED_DOMAIN_EXISTS,
          );
        } else {
          await this.secludedDomainRepository.update(param.id, {
            ...data,
            updatedAt: new Date(),
          });
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_SECLUDED_DOMAIN_SUCCEED,
          );
        }
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeleteSecludedDomain(param: any): Promise<HttpResponse> {
    try {
      const result = await this.secludedDomainRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.secludedDomainRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_SECLUDED_DOMAIN_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.SECLUDED_DOMAIN_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
