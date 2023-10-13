import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './model/account.model';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { PasswordService } from 'src/auth/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService, PasswordService],
  exports: [TypeOrmModule.forFeature([Account])],
})
export class AccountModule {}
