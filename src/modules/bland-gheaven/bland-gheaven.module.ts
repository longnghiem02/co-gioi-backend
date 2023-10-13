import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlandGheaven } from './model/bland-gheaven.model';
import { BlandGheavenController } from './bland-gheaven.controller';
import { BlandGheavenService } from './bland-gheaven.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlandGheaven])],
  controllers: [BlandGheavenController],
  providers: [BlandGheavenService],
})
export class BlandGheavenModule {}
