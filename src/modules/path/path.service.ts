import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';
import { Path } from './model/path.model';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import { HttpResponse } from 'src/common/dto/http-response.dto';
import { ErrorResponse } from 'src/common/dto/error-response.dto';
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

  async getPath(param: any): Promise<HttpResponse | ErrorResponse> {
    try {
      const result = await this.pathRepository.findOne({
        where: { id: param.id },
        select: {
          id: true,
          name: true,
          detail: true,
        },
      });
      if (result) {
        return new HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        return new ErrorResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.PATH_NOT_FOUND,
        );
      }
    } catch (error) {
      return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async getAllPath(query: any): Promise<HttpResponse | ErrorResponse> {
    try {
      const [data, count] = await this.pathRepository.findAndCount({
        where: {
          name: ILike(`%${query.search}%`),
        },
        order: { name: 'ASC' },
        take: query.limit,
        skip: (query.page - 1) * query.limit,
        select: {
          id: true,
          name: true,
        },
      });

      const result = new PageDTO(
        data,
        new MetaDTO(count, query.page, query.limit),
      );

      if (result) {
        return new HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        return new ErrorResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.PATH_NOT_FOUND,
        );
      }
    } catch (error) {
      return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async getAllPathName(): Promise<HttpResponse | ErrorResponse> {
    try {
      const result = await this.pathRepository.find({
        order: { name: 'ASC' },
        select: {
          id: true,
          name: true,
        },
      });
      if (result) {
        return new HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        return new ErrorResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.PATH_NOT_FOUND,
        );
      }
    } catch (error) {
      return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async addPath(data: any): Promise<HttpResponse | ErrorResponse> {
    try {
      const check = await this.pathRepository.findOneBy({ name: data.name });
      if (check) {
        return new ErrorResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.PATH_EXISTS,
        );
      } else {
        await this.pathRepository.save(data);
        return new HttpResponse(
          HttpStatus.CREATED,
          CommonMessage.ADD_PATH_SUCCEED,
        );
      }
    } catch (error) {
      return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async updatePath(
    param: any,
    data: any,
  ): Promise<HttpResponse | ErrorResponse> {
    try {
      const result = await this.pathRepository.findOneBy({ id: param.id });
      if (!result) {
        return new ErrorResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.PATH_NOT_FOUND,
        );
      } else {
        const check = await this.pathRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          return new ErrorResponse(
            HttpStatus.BAD_REQUEST,
            ErrorMessage.PATH_EXISTS,
          );
        } else {
          await this.pathRepository.update(param.id, data);
          return new HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_PATH_SUCCEED,
          );
        }
      }
    } catch (error) {
      return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async deletePath(param: any): Promise<HttpResponse | ErrorResponse> {
    try {
      const result = await this.pathRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.pathRepository.delete(param.id);
        return new HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_PATH_SUCCEED,
        );
      } else {
        return new ErrorResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.PATH_NOT_FOUND,
        );
      }
    } catch (error) {
      return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
