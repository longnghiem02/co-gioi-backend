import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Not, Repository } from 'typeorm';
import { OtherInfo } from './model/orther-info.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class OtherInfoService {
  constructor(
    @InjectRepository(OtherInfo)
    private otherInfoRepository: Repository<OtherInfo>,
  ) {}

  async handleGetOtherInfo(param: any): Promise<HttpResponse> {
    try {
      const result = await this.otherInfoRepository.findOne({
        where: { id: param.id >= 0 ? param.id : 0 },
        select: {
          id: true,
          name: true,
          detail: true,
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.OTHER_INFO_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllOtherInfo(param: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.otherInfoRepository.findAndCount({
        where: { id: Not(LessThan(0)), type: param.type ? param.type : null },
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
          ErrorMessage.OTHER_INFO_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllOtherInfoName(param: any): Promise<HttpResponse> {
    try {
      const result = await this.otherInfoRepository.find({
        where: [
          { type: param?.type ? param.type : null },
          { type: 'none' },
          { type: 'unknown' },
        ],
        order: { id: 'ASC' },
        select: {
          id: true,
          name: true,
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.OTHER_INFO_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddOtherInfo(data: any): Promise<HttpResponse> {
    try {
      const check = await this.otherInfoRepository.findOneBy({
        name: data.name,
      });
      if (check) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.OTHER_INFO_EXISTS,
        );
      } else {
        await this.otherInfoRepository.save(data);
        return HttpResponse(
          HttpStatus.CREATED,
          CommonMessage.ADD_OTHER_INFO_SUCCEED,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateOtherInfo(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.otherInfoRepository.findOneBy({ id: param.id });
      if (!result) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.OTHER_INFO_NOT_FOUND,
        );
      } else {
        const check = await this.otherInfoRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          return HttpResponse(
            HttpStatus.BAD_REQUEST,
            ErrorMessage.OTHER_INFO_EXISTS,
          );
        } else {
          await this.otherInfoRepository.update(param.id, {
            ...data,
            updatedAt: new Date(),
          });
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_OTHER_INFO_SUCCEED,
          );
        }
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeleteOtherInfo(param: any): Promise<HttpResponse> {
    try {
      const result = await this.otherInfoRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.otherInfoRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_OTHER_INFO_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.OTHER_INFO_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
