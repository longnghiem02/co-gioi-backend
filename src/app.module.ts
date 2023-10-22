import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConnectDBModule } from './connect/database/database.connect';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { AccountModule } from './modules/account/account.module';
import { PathModule } from './modules/path/path.module';
import { OtherInfoModule } from './modules/other-info/other-info.module';
import { GuModule } from './modules/gu/gu.module';
import { GuFormationModule } from './modules/gu-formation/gu-formation.module';
import { GuHouseModule } from './modules/gu-house/gu-house.module';
import { BeastModule } from './modules/beast/beast.module';
import { BlandGheavenModule } from './modules/bland-gheaven/bland-gheaven.module';
import { SecludedDomainModule } from './modules/secluded-domain/secluded-domain.module';
import { KillerMoveModule } from './modules/killer-move/killer-move.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConnectDBModule,
    AuthModule,
    AccountModule,
    RoleModule,
    PathModule,
    OtherInfoModule,
    GuModule,
    GuFormationModule,
    GuHouseModule,
    KillerMoveModule,
    BeastModule,
    BlandGheavenModule,
    SecludedDomainModule,
  ],
})
export class AppModule {}
