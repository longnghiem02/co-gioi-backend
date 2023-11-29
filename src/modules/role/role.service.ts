import {
  Injectable,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Role } from './model/role.model';
import { HttpResponse } from 'src/common/dto/http-response.dto';
import {
  CommonMessage,
  RoleMessage,
} from 'src/common/constants/message.constants';
import { PageDTO, MetaDTO } from 'src/common/dto';

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
        return new HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        throw new NotFoundException(RoleMessage.ROLE_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async handleGetAllRole(query: any): Promise<HttpResponse> {
    try {
      const [data, count] = await this.roleRepository.findAndCount({
        order: { name: 'ASC' },
        take: query.take,
        skip: (query.page - 1) * query.take,
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
        throw new NotFoundException(RoleMessage.ROLE_NOT_FOUND);
      }
    } catch (error) {
      throw error;
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
        return new HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        throw new NotFoundException(RoleMessage.ROLE_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async handleAddRole(data: any): Promise<HttpResponse> {
    try {
      const check = await this.roleRepository.findOneBy({ name: data.name });
      if (check) {
        throw new BadRequestException(RoleMessage.ROLE_EXISTS);
      } else {
        await this.roleRepository.save(data);
        return new HttpResponse(
          HttpStatus.CREATED,
          RoleMessage.ADD_ROLE_SUCCEED,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async handleUpdateRole(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.roleRepository.findOneBy({ id: param.id });
      if (!result) {
        throw new NotFoundException(RoleMessage.ROLE_NOT_FOUND);
      } else {
        const check = await this.roleRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          throw new BadRequestException(RoleMessage.ROLE_EXISTS);
        } else {
          await this.roleRepository.update(param.id, data);
          return new HttpResponse(
            HttpStatus.CREATED,
            RoleMessage.UPDATE_ROLE_SUCCEED,
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async handleDeleteRole(param: any): Promise<HttpResponse> {
    try {
      const result = await this.roleRepository.findOne({
        where: { name: param.name },
      });
      if (result) {
        await this.roleRepository.delete(param.id);
        return new HttpResponse(
          HttpStatus.ACCEPTED,
          RoleMessage.DELETE_ROLE_SUCCEED,
        );
      } else {
        throw new NotFoundException(RoleMessage.ROLE_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }
}
