import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';
import { Character } from './model/character.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { MetaDTO } from 'src/common/dto/meta.dto';
import { PageDTO } from 'src/common/dto/page.dto';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/common/constants/message.constants';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  async handleGetCharacter(query: any): Promise<HttpResponse> {
    try {
      const result = await this.characterRepository.findOne({
        where: { id: query.id },
        relations: {
          mainPath: true,
          subPath: true,
          region: true,
          race: true,
          physique: true,
        },
        select: {
          id: true,
          name: true,
          description: true,
          detail: true,
          mainPath: {
            id: true,
            name: true,
          },
          subPath: {
            id: true,
            name: true,
          },
          region: {
            id: true,
            name: true,
          },
          race: {
            id: true,
            name: true,
          },
          physique: {
            id: true,
            name: true,
          },
        },
      });
      if (result) {
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.CHARACTER_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleGetAllCharacter(
    filter: any,
    paginate: any,
  ): Promise<HttpResponse> {
    try {
      const [data, count] = await this.characterRepository.findAndCount({
        where: {
          mainPathId: filter.mainPathId ? filter.mainPathId : null,
          subPathId: filter.subPathId ? filter.subPathId : null,
          regionId: filter.regionId ? filter.regionId : null,
          raceId: filter.raceId ? filter.raceId : null,
          physiqueId: filter.physiqueId ? filter.physiqueId : null,
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
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.CHARACTER_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleSearchCharacter(
    search: any,
    paginate: any,
  ): Promise<HttpResponse> {
    try {
      const [data, count] = await this.characterRepository.findAndCount({
        where: { name: ILike(`%${search.name}%`) },
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
        return HttpResponse(HttpStatus.OK, CommonMessage.OK, result);
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.CHARACTER_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleAddCharacter(data: any): Promise<HttpResponse> {
    try {
      const check = await this.characterRepository.findOneBy({
        name: data.name,
      });
      if (check) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.CHARACTER_EXISTS,
        );
      } else {
        await this.characterRepository.save(data);
        return HttpResponse(
          HttpStatus.CREATED,
          CommonMessage.ADD_CHARACTER_SUCCEED,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleUpdateCharacter(param: any, data: any): Promise<HttpResponse> {
    try {
      const result = await this.characterRepository.findOneBy({ id: param.id });
      if (!result) {
        return HttpResponse(
          HttpStatus.BAD_REQUEST,
          ErrorMessage.CHARACTER_NOT_FOUND,
        );
      } else {
        const check = await this.characterRepository.findOne({
          where: { id: Not(param.id), name: data.name },
        });
        if (check) {
          return HttpResponse(
            HttpStatus.BAD_REQUEST,
            ErrorMessage.CHARACTER_EXISTS,
          );
        } else {
          await this.characterRepository.update(param.id, data);
          return HttpResponse(
            HttpStatus.CREATED,
            CommonMessage.UPDATE_CHARACTER_SUCCEED,
          );
        }
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async handleDeleteCharacter(param: any): Promise<HttpResponse> {
    try {
      const result = await this.characterRepository.findOne({
        where: { id: param.id },
      });
      if (result) {
        await this.characterRepository.delete(param.id);
        return HttpResponse(
          HttpStatus.ACCEPTED,
          CommonMessage.DELETE_CHARACTER_SUCCEED,
        );
      } else {
        return HttpResponse(
          HttpStatus.NOT_FOUND,
          ErrorMessage.CHARACTER_NOT_FOUND,
        );
      }
    } catch (error) {
      return HttpResponse(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
