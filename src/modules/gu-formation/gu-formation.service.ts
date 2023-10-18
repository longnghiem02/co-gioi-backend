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

  async handleGetGuFormation(query: any): Promise<HttpResponse> {
    try {
      const result = await this.guFormationRepository.findOne({
        where: { id: query.id },
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
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.GU_FORMATION_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllGuFormation(
    filter: any,
    paginate: any,
  ): Promise<HttpResponse> {
    try {
      const [data, count] = await this.guFormationRepository.findAndCount({
        where: {
          pathId: filter.pathId ? filter.pathId : null,
          typeId: filter.typeId ? filter.typeId : null,
          rankId: filter.rankId ? filter.rankId : null,
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
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.GU_FORMATION_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleSearchGuFormation(
    search: any,
    paginate: any,
  ): Promise<HttpResponse> {
    try {
      const [data, count] = await this.guFormationRepository
        .createQueryBuilder('gu-formations')
        .select(['gu-formations.id', 'gu-formations.name'])
        .where('gu-formations.name ILIKE :name', { name: `%${search.name}%` })
        .limit(paginate.take)
        .offset((paginate.page - 1) * paginate.take)
        .orderBy('gu-formations.name', 'ASC')
        .getManyAndCount();

      const result = new PageDTO(
        data,
        new MetaDTO(count, paginate.take, paginate.page),
      );

      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.GU_FORMATION_NOT_FOUND,
        );
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
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.GU_FORMATION_EXISTS,
        );
      } else {
        await this.guFormationRepository.save(data);
        return HttpResponse(
          HttpStatus.CREATED,
          CommonMessage.ADD_GU_FORMATION_SUCCEED,
        );
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
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.GU_FORMATION_NOT_FOUND,
        );
      } else {
        const check = await this.guFormationRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          return HttpResponse(
            HttpStatus.BAD_REQUEST,
            ErrorMessage.GU_FORMATION_EXISTS,
          );
        } else {
          await this.guFormationRepository.update(param.id, {
            ...data,
            updatedAt: new Date(),
          });
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_GU_FORMATION_SUCCEED,
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
          CommonMessage.DELETE_GU_FORMATION_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.GU_FORMATION_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
