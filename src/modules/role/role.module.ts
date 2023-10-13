import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './model/role.model';
import { Account } from '../account/model/account.model';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Account])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
