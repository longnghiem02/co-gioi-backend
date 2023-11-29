import {
  Injectable,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';
import { Gu } from './model/gu.model';
import { PageDTO, MetaDTO } from 'src/common/dto';
import { HttpResponse } from 'src/common/dto/http-response.dto';
import {
  CommonMessage,
  GuMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class GuService {
  constructor(
    @InjectRepository(Gu)
    private guRepository: Repository<Gu>,
  ) {}

  async getGu(param: any): Promise<HttpResponse> {
    try {
      const result = await this.guRepository.findOne({
        where: { id: param.id },
        relations: { path: true },
        select: {
          id: true,
          name: true,
          description: true,
          information: true,
          image: true,
          path: {
            id: true,
            name: true,
          },
        },
      });
      if (result) {
        return new HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        throw new NotFoundException(GuMessage.GU_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllGu(query: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.guRepository.findAndCount({
        where: {
          name: ILike(`%${query.search}%`),
          pathId: query.pathId ? query.pathId : null,
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
        throw new NotFoundException(GuMessage.GU_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async addGu(data: any): Promise<HttpResponse> {
    try {
      const check = await this.guRepository.findOneBy({ name: data.name });
      if (check) {
        throw new BadRequestException(GuMessage.GU_EXISTS);
      } else {
        await this.guRepository.save(data);
        return new HttpResponse(HttpStatus.CREATED, GuMessage.ADD_GU_SUCCEED);
      }
    } catch (error) {
      throw error;
    }
  }

  async updateGu(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.guRepository.findOneBy({ id: param.id });
      if (!result) {
        throw new NotFoundException(GuMessage.GU_NOT_FOUND);
      } else {
        const check = await this.guRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          throw new BadRequestException(GuMessage.GU_EXISTS);
        } else {
          await this.guRepository.update(param.id, data);
          return new HttpResponse(
            HttpStatus.CREATED,
            GuMessage.UPDATE_GU_SUCCEED,
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteGu(param: any): Promise<HttpResponse> {
    try {
      const result = await this.guRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.guRepository.delete(param.id);
        return new HttpResponse(
          HttpStatus.ACCEPTED,
          GuMessage.DELETE_GU_SUCCEED,
        );
      } else {
        throw new NotFoundException(GuMessage.GU_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }
}
