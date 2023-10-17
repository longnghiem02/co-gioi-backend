import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuHouse } from './model/gu-house.model';
import { GuHouseController } from './gu-house.controller';
import { GuHouseService } from './gu-house.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuHouse])],
  controllers: [GuHouseController],
  providers: [GuHouseService],
})
export class GuHouseModule {}
