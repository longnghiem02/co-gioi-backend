import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';
import { Gu } from './model/gu.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class GuService {
  constructor(
    @InjectRepository(Gu)
    private guRepository: Repository<Gu>,
  ) {}

  async handleGetGu(query: any): Promise<HttpResponse> {
    try {
      const result = await this.guRepository.findOne({
        where: { id: query.id },
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
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.GU_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllGu(filter: any, paginate: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.guRepository.findAndCount({
        where: {
          path: filter.path ? filter.path : null,
        },
        order: { name: 'ASC' },
        take: paginate.take,
        skip: (paginate.page - 1) * paginate.take,
        select: {
          id: true,
          name: true,
        },
      });

      const result = new PageDTO(
        data,
        new MetaDTO(count, paginate.take, paginate.page),
      );

      if (result) {
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.GU_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleSearchGu(search: any, paginate: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.guRepository.findAndCount({
        where: { name: ILike(`%${search.name ? search.name : null}%`) },
        order: { name: 'ASC' },
        take: paginate.take,
        skip: (paginate.page - 1) * paginate.take,
        select: {
          id: true,
          name: true,
        },
      });

      const result = new PageDTO(
        data,
        new MetaDTO(count, paginate.take, paginate.page),
      );

      if (result) {
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.GU_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddGu(data: any): Promise<HttpResponse> {
    try {
      const check = await this.guRepository.findOneBy({ name: data.name });
      if (check) {
        return HttpResponse(HttpStatus.BAD_REQUEST, ErrorMessage.GU_EXISTS);
      } else {
        await this.guRepository.save(data);
        return HttpResponse(HttpStatus.CREATED, CommonMessage.ADD_GU_SUCCEED);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateGu(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.guRepository.findOneBy({ id: param.id });
      if (!result) {
        return HttpResponse(HttpStatus.BAD_REQUEST, ErrorMessage.GU_NOT_FOUND);
      } else {
        const check = await this.guRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          return HttpResponse(HttpStatus.BAD_REQUEST, ErrorMessage.GU_EXISTS);
        } else {
          await this.guRepository.update(param.id, data);
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_GU_SUCCEED,
          );
        }
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeleteGu(param: any): Promise<HttpResponse> {
    try {
      const result = await this.guRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.guRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_GU_SUCCEED,
        );
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.GU_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
