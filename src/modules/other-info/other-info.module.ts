import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherInfo } from './model/orther-info.model';
import { OtherInfoController } from './orther-info.controller';
import { OtherInfoService } from './other-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([OtherInfo])],
  controllers: [OtherInfoController],
  providers: [OtherInfoService],
})
export class OtherInfoModule {}
