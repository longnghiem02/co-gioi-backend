import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PathService } from './path.service';
import { PathController } from './path.controller';
import { Path } from './model/path.model';

@Module({
  imports: [TypeOrmModule.forFeature([Path])],
  controllers: [PathController],
  providers: [PathService],
})
export class PathModule {}
