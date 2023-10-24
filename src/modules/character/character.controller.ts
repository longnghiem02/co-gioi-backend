import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CharacterService } from './character.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { IdDTO, SearchDTO, PaginateDTO } from 'src/common/dto';
import { AddCharacterDTO, UpdateCharacterDTO, FilterCharacterDTO } from './dto';

@ApiTags('Character')
@ApiBearerAuth()
@Controller('character')
export class CharacterController {
  constructor(private guService: CharacterService) {}

  @Get('get')
  @Public()
  async getCharacter(@Query() idDTO: IdDTO) {
    return await this.guService.handleGetCharacter(idDTO);
  }

  @Get('get-all')
  @Public()
  async getAllCharacter(
    @Query() filterCharacterDTO: FilterCharacterDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.guService.handleGetAllCharacter(
      filterCharacterDTO,
      paginateDTO,
    );
  }

  @Get('search')
  @Public()
  async searchCharacter(
    @Query() searchDTO: SearchDTO,
    @Query() paginateDTO: PaginateDTO,
  ) {
    return await this.guService.handleSearchCharacter(searchDTO, paginateDTO);
  }

  @Post('add')
  @Roles(Role.ADMIN)
  async addCharacter(@Body() addCharacterDTO: AddCharacterDTO) {
    return await this.guService.handleAddCharacter(addCharacterDTO);
  }

  @Put('update/:id')
  @Roles(Role.ADMIN)
  async updateCharacter(
    @Param() idDTO: IdDTO,
    @Body() updateCharacterDTO: UpdateCharacterDTO,
  ) {
    return await this.guService.handleUpdateCharacter(
      idDTO,
      updateCharacterDTO,
    );
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  async deleteCharacter(@Param() idDTO: IdDTO) {
    return await this.guService.handleDeleteCharacter(idDTO);
  }
}
