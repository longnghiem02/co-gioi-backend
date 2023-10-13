import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gu } from './model/gu.model';
import { GuController } from './gu.controller';
import { GuService } from './gu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gu])],
  controllers: [GuController],
  providers: [GuService],
})
export class GuModule {}
