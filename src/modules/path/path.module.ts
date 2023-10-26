import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Path } from './model/path.model';
import { PathService } from './path.service';
import { PathController } from './path.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Path])],
  controllers: [PathController],
  providers: [PathService],
})
export class PathModule {}
