import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beast } from './model/beast.model';
import { BeastController } from './beast.controller';
import { BeastService } from './beast.service';

@Module({
  imports: [TypeOrmModule.forFeature([Beast])],
  controllers: [BeastController],
  providers: [BeastService],
})
export class BeastModule {}
