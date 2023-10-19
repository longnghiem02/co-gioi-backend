import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Role } from './model/role.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async handleGetRole(query: any): Promise<HttpResponse> {
    try {
      const result = await this.roleRepository.findOne({
        where: { id: query.id },
        select: {
          name: true,
          detail: true,
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.ROLE_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllRole(paginate: any): Promise<HttpResponse> {
    try {
      const result = await this.roleRepository.find({
        order: { name: 'ASC' },
        take: paginate.take,
        skip: (paginate.page - 1) * paginate.take,
        select: {
          id: true,
          name: true,
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.ROLE_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllRoleName(): Promise<HttpResponse> {
    try {
      const result = await this.roleRepository.find({
        select: {
          id: true,
          name: true,
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, '', result);
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.ROLE_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddRole(data: any): Promise<HttpResponse> {
    try {
      const check = await this.roleRepository.findOneBy({ name: data.name });
      if (check) {
        return HttpResponse(HttpStatus.BAD_REQUEST, ErrorMessage.ROLE_EXISTS);
      } else {
        await this.roleRepository.save(data);
        return HttpResponse(HttpStatus.CREATED, CommonMessage.ADD_ROLE_SUCCEED);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateRole(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.roleRepository.findOneBy({ id: param.id });
      if (!result) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.ROLE_NOT_FOUND,
        );
      } else {
        const check = await this.roleRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          return HttpResponse(HttpStatus.BAD_REQUEST, ErrorMessage.ROLE_EXISTS);
        } else {
          await this.roleRepository.update(param.id, data);
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_ROLE_SUCCEED,
          );
        }
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeleteRole(param: any): Promise<HttpResponse> {
    try {
      const result = await this.roleRepository.findOne({
        where: { name: param.name },
      });
      if (result) {
        await this.roleRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_ROLE_SUCCEED,
        );
      } else {
        return HttpResponse(HttpStatus.NOT_FOUND, ErrorMessage.ROLE_NOT_FOUND);
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
