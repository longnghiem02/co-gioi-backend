import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { BlandGheaven } from './model/bland-gheaven.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class BlandGheavenService {
  constructor(
    @InjectRepository(BlandGheaven)
    private blandGheavenRepository: Repository<BlandGheaven>,
  ) {}

  async handleGetBlandGheaven(param: any): Promise<HttpResponse> {
    try {
      const result = await this.blandGheavenRepository.findOne({
        where: { id: param.id },
        relations: { path: true, type: true },
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
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.BLAND_GHEAVEN_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllBlandGheaven(param: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.blandGheavenRepository.findAndCount({
        where: {
          pathId: param.path ? param.path : null,
          typeId: param.type ? param.type : null,
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
          ErrorMessage.BLAND_GHEAVEN_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddBlandGheaven(data: any): Promise<HttpResponse> {
    try {
      const check = await this.blandGheavenRepository.findOneBy({
        name: data.name,
      });
      if (check) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.BLAND_GHEAVEN_EXISTS,
        );
      } else {
        await this.blandGheavenRepository.save(data);
        return HttpResponse(
          HttpStatus.CREATED,
          CommonMessage.ADD_BLAND_GHEAVEN_SUCCEED,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateBlandGheaven(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.blandGheavenRepository.findOneBy({
        id: param.id,
      });
      if (!result) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.BLAND_GHEAVEN_NOT_FOUND,
        );
      } else {
        const check = await this.blandGheavenRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          return HttpResponse(
            HttpStatus.BAD_REQUEST,
            ErrorMessage.BLAND_GHEAVEN_EXISTS,
          );
        } else {
          await this.blandGheavenRepository.update(param.id, {
            ...data,
            updatedAt: new Date(),
          });
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_BLAND_GHEAVEN_SUCCEED,
          );
        }
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeleteBlandGheaven(param: any): Promise<HttpResponse> {
    try {
      const result = await this.blandGheavenRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.blandGheavenRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_BLAND_GHEAVEN_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.BLAND_GHEAVEN_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
