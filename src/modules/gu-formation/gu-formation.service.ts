import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { GuFormation } from './model/gu-formation.model';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class GuFormationService {
  constructor(
    @InjectRepository(GuFormation)
    private guFormationRepository: Repository<GuFormation>,
  ) {}

  async handleGetGuFormation(param: any): Promise<HttpResponse> {
    try {
      const result = await this.guFormationRepository.findOne({
        where: { id: param.id },
        relations: { path: true, type: true, rank: true },
        select: {
          id: true,
          name: true,
          description: true,
          detail: true,
          path: {
            id: true,
            name: true,
          },
          type: {
            id: true,
            name: true,
          },
          rank: {
            id: true,
            name: true,
          },
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.GU_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllGuFormation(param: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.guFormationRepository.findAndCount({
        where: {
          pathId: param.path ? param.path : null,
          typeId: param.type ? param.type : null,
          rankId: param.rank ? param.rank : null,
        },
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
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.GU_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleSearchGuFormation(param: any): Promise<HttpResponse> {
    try {
      const result = await this.guFormationRepository
        .createQueryBuilder('gus')
        .select(['gus.id', 'gus.name'])
        .where('gus.name ILIKE :name', { name: `%${param.name}%` })
        .limit(param.take)
        .getMany();

      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.GU_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddGuFormation(data: any): Promise<HttpResponse> {
    try {
      const check = await this.guFormationRepository.findOneBy({
        name: data.name,
      });
      if (check) {
        return HttpResponse(HttpStatus.BAD_REQUEST, ErrorMessage.GU_EXISTS);
      } else {
        await this.guFormationRepository.save(data);
        return HttpResponse(HttpStatus.CREATED, CommonMessage.ADD_GU_SUCCEED);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateGuFormation(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.guFormationRepository.findOneBy({
        id: param.id,
      });
      if (!result) {
        return HttpResponse(HttpStatus.BAD_REQUEST, ErrorMessage.GU_NOT_FOUND);
      } else {
        const check = await this.guFormationRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          return HttpResponse(HttpStatus.BAD_REQUEST, ErrorMessage.GU_EXISTS);
        } else {
          await this.guFormationRepository.update(param.id, {
            ...data,
            updatedAt: new Date(),
          });
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

  async handleDeleteGuFormation(param: any): Promise<HttpResponse> {
    try {
      const result = await this.guFormationRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.guFormationRepository.delete(param.id);
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
