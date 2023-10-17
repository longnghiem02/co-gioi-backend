import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Gu } from 'src/modules/gu/model/gu.model';
import { GuHouse } from 'src/modules/gu-house/model/gu-house.model';
import { GuFormation } from 'src/modules/gu-formation/model/gu-formation.model';
import { KillerMove } from 'src/modules/killer-move/model/killer-move.model';
import { Beast } from 'src/modules/beast/model/beast.model';
import { BlandGheaven } from 'src/modules/bland-gheaven/model/bland-gheaven.model';
import { SecludedDomain } from 'src/modules/secluded-domain/model/secluded-domain.model';
import { Character } from 'src/modules/character/model/character.model';

@Entity({ name: 'other-info' })
export class OtherInfo extends AbstractEntity {
  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'detail',
    nullable: true,
  })
  detail: string;

  @Column({
    name: 'type',
    nullable: true,
  })
  type: string;

  @OneToMany(
    () => Gu,
    (gu) => {
      gu.type, gu.rank;
    },
  )
  gus: Gu[];

  @OneToMany(
    () => GuHouse,
    (guHouse) => {
      guHouse.type, guHouse.rank;
    },
  )
  guHouses: GuHouse[];

  @OneToMany(
    () => GuFormation,
    (guFormation) => {
      guFormation.type, guFormation.rank;
    },
  )
  guFormations: GuFormation[];

  @OneToMany(
    () => KillerMove,
    (killerMove) => {
      killerMove.type, killerMove.rank;
    },
  )
  killerMoves: KillerMove[];

  @OneToMany(
    () => Beast,
    (beast) => {
      beast.type, beast.rank;
    },
  )
  beasts: Beast[];

  @OneToMany(
    () => Character,
    (character) => {
      character.race, character.physique;
    },
  )
  characters: Character[];

  @OneToMany(
    () => BlandGheaven,
    (blandGheaven) => {
      blandGheaven.type;
    },
  )
  blandsGheavens: BlandGheaven[];

  @OneToMany(
    () => SecludedDomain,
    (secludedDomain) => {
      secludedDomain.type;
    },
  )
  secludedDomains: SecludedDomain[];
}
