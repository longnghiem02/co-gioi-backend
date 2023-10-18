import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { GuHouse } from './model/gu-house.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class GuHouseService {
  constructor(
    @InjectRepository(GuHouse)
    private guHouseRepository: Repository<GuHouse>,
  ) {}

  async handleGetGuHouse(param: any): Promise<HttpResponse> {
    try {
      const result = await this.guHouseRepository.findOne({
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
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.GU_HOUSE_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllGuHouse(param: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.guHouseRepository.findAndCount({
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
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.GU_HOUSE_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleSearchGuHouse(param: any): Promise<HttpResponse> {
    try {
      const result = await this.guHouseRepository
        .createQueryBuilder('gu-houses')
        .select(['gu-houses.id', 'gu-houses.name'])
        .where('gu-houses.name ILIKE :name', { name: `%${param.name}%` })
        .limit(param.take)
        .getMany();

      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.GU_HOUSE_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddGuHouse(data: any): Promise<HttpResponse> {
    try {
      const check = await this.guHouseRepository.findOneBy({ name: data.name });
      if (check) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.GU_HOUSE_EXISTS,
        );
      } else {
        await this.guHouseRepository.save(data);
        return HttpResponse(
          HttpStatus.CREATED,
          CommonMessage.ADD_GU_HOUSE_SUCCEED,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateGuHouse(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.guHouseRepository.findOneBy({ id: param.id });
      if (!result) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.GU_HOUSE_NOT_FOUND,
        );
      } else {
        const check = await this.guHouseRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          return HttpResponse(
            HttpStatus.BAD_REQUEST,
            ErrorMessage.GU_HOUSE_EXISTS,
          );
        } else {
          await this.guHouseRepository.update(param.id, {
            ...data,
            updatedAt: new Date(),
          });
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_GU_HOUSE_SUCCEED,
          );
        }
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeleteGuHouse(param: any): Promise<HttpResponse> {
    try {
      const result = await this.guHouseRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.guHouseRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_GU_HOUSE_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.GU_HOUSE_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
