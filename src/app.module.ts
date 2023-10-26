import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConnectDBModule } from './connect/database/database.connect';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { AccountModule } from './modules/account/account.module';
import { PathModule } from './modules/path/path.module';
import { GuModule } from './modules/gu/gu.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConnectDBModule,
    AuthModule,
    AccountModule,
    RoleModule,
    PathModule,
    GuModule,
  ],
})
export class AppModule {}
