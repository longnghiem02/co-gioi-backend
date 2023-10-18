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
import { RoleService } from './role.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/enums';
import { AddRoleDTO, UpdateRoleDTO } from './dto';
import { IdDTO } from 'src/common/dto/id.dto';
import { PaginateDTO } from 'src/common/dto/paginate.dto';

@ApiTags('Role')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('get-role')
  @Roles(Role.ADMIN)
  async getRole(@Query() idDTO: IdDTO) {
    return await this.roleService.handleGetRole(idDTO);
  }

  @Get('get-all-role')
  @Roles(Role.ADMIN)
  async getAllRole(@Query() paginateDTO: PaginateDTO) {
    return await this.roleService.handleGetAllRole(paginateDTO);
  }

  @Get('get-all-role-name')
  @Roles(Role.ADMIN)
  async getAllRoleName() {
    return await this.roleService.handleGetAllRoleName();
  }

  @Post('add-role')
  @Roles(Role.ADMIN)
  async addRole(@Body() addRoleDTO: AddRoleDTO) {
    return await this.roleService.handleAddRole(addRoleDTO);
  }

  @Put('update-role/:id')
  @Roles(Role.ADMIN)
  async updateRole(
    @Param() idDTO: IdDTO,
    @Body() updateRoleDTO: UpdateRoleDTO,
  ) {
    return await this.roleService.handleUpdateRole(idDTO, updateRoleDTO);
  }

  @Delete('delete-role/:id')
  @Roles(Role.ADMIN)
  async deleteRole(@Param() idDTO: IdDTO) {
    return await this.roleService.handleDeleteRole(idDTO);
  }
}
