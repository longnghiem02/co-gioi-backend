import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuFormation } from './model/gu-formation.model';
import { GuFormationController } from './gu-formation.controller';
import { GuFormationService } from './gu-formation.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuFormation])],
  controllers: [GuFormationController],
  providers: [GuFormationService],
})
export class GuFormationModule {}
