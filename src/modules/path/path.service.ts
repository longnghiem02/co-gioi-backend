import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, LessThan, MoreThan, Not, Repository } from 'typeorm';
import { Path } from './model/path.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class PathService {
  constructor(
    @InjectRepository(Path)
    private pathRepository: Repository<Path>,
  ) {}

  async handleGetPath(query: any): Promise<HttpResponse> {
    try {
      const result = await this.pathRepository.findOne({
        where: { id: query.id >= 0 ? query.id : 0 },
        select: {
          id: true,
          name: true,
          detail: true,
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.PATH_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllPath(paginate: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.pathRepository.findAndCount({
        where: { id: Not(LessThan(0)) },
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
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.PATH_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllPathName(): Promise<HttpResponse> {
    try {
      const result = await this.pathRepository.find({
        order: { name: 'ASC' },
        select: {
          id: true,
          name: true,
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.PATH_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleSearchPath(search: any, paginate: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.pathRepository.findAndCount({
        where: { id: MoreThan(0), name: ILike(`%${search.name}%`) },
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
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.PATH_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddPath(data: any): Promise<HttpResponse> {
    try {
      const check = await this.pathRepository.findOneBy({ name: data.name });
      if (check) {
        return HttpResponse(HttpStatus.BAD_REQUEST, ErrorMessage.PATH_EXISTS);
      } else {
        await this.pathRepository.save(data);
        return HttpResponse(HttpStatus.CREATED, CommonMessage.ADD_PATH_SUCCEED);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdatePath(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.pathRepository.findOneBy({ id: param.id });
      if (!result) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.PATH_NOT_FOUND,
        );
      } else {
        const check = await this.pathRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          return HttpResponse(HttpStatus.BAD_REQUEST, ErrorMessage.PATH_EXISTS);
        } else {
          await this.pathRepository.update(param.id, data);
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_PATH_SUCCEED,
          );
        }
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeletePath(param: any): Promise<HttpResponse> {
    try {
      const result = await this.pathRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.pathRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_PATH_SUCCEED,
        );
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.PATH_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
