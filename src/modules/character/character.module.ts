import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './model/character.model';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
