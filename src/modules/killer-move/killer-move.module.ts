import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KillerMove } from './model/killer-move.model';
import { KillerMoveController } from './killer-move.controller';
import { KillerMoveService } from './killer-move.service';

@Module({
  imports: [TypeOrmModule.forFeature([KillerMove])],
  controllers: [KillerMoveController],
  providers: [KillerMoveService],
})
export class KillerMoveModule {}
