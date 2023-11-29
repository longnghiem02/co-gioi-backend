import {
  Injectable,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';
import { Path } from './model/path.model';
import { PageDTO, MetaDTO } from 'src/common/dto';
import { HttpResponse } from 'src/common/dto/http-response.dto';
import {
  CommonMessage,
  PathMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class PathService {
  constructor(
    @InjectRepository(Path)
    private pathRepository: Repository<Path>,
  ) {}

  async getPath(param: any): Promise<HttpResponse> {
    try {
      const result = await this.pathRepository.findOne({
        where: { id: param.id },
        select: {
          id: true,
          name: true,
          information: true,
        },
      });
      if (result) {
        return new HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        throw new NotFoundException(PathMessage.PATH_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllPath(query: any): Promise<HttpResponse> {
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
        throw new NotFoundException(PathMessage.PATH_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllPathName(): Promise<HttpResponse> {
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
        throw new NotFoundException(PathMessage.PATH_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async addPath(data: any): Promise<HttpResponse> {
    try {
      const check = await this.pathRepository.findOneBy({ name: data.name });
      if (check) {
        throw new BadRequestException(PathMessage.PATH_EXISTS);
      } else {
        await this.pathRepository.save(data);
        return new HttpResponse(
          HttpStatus.CREATED,
          PathMessage.ADD_PATH_SUCCEED,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async updatePath(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.pathRepository.findOneBy({ id: param.id });
      if (!result) {
        throw new NotFoundException(PathMessage.PATH_NOT_FOUND);
      } else {
        const check = await this.pathRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          throw new BadRequestException(PathMessage.PATH_EXISTS);
        } else {
          await this.pathRepository.update(param.id, data);
          return new HttpResponse(
            HttpStatus.CREATED,
            PathMessage.UPDATE_PATH_SUCCEED,
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async deletePath(param: any): Promise<HttpResponse> {
    try {
      const result = await this.pathRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.pathRepository.delete(param.id);
        return new HttpResponse(
          HttpStatus.ACCEPTED,
          PathMessage.DELETE_PATH_SUCCEED,
        );
      } else {
        throw new NotFoundException(PathMessage.PATH_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }
}
