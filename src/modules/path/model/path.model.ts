import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Gu } from 'src/modules/gu/model/gu.model';
import { GuHouse } from 'src/modules/gu-house/model/gu-house.model';
import { GuFormation } from 'src/modules/gu-formation/model/gu-formation.model';
import { KillerMove } from 'src/modules/killer-move/model/killer-move.model';
import { Beast } from 'src/modules/beast/model/beast.model';
import { Character } from 'src/modules/character/model/character.model';
import { SecludedDomain } from 'src/modules/secluded-domain/model/secluded-domain.model';
import { BlandGheaven } from 'src/modules/bland-gheaven/model/bland-gheaven.model';

@Entity({ name: 'paths' })
export class Path extends AbstractEntity {
  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'detail',
    nullable: true,
  })
  detail: string;

  @OneToMany(() => Gu, (gu) => gu.path)
  gus: Gu[];

  @OneToMany(() => GuHouse, (guHouse) => guHouse.path)
  guHouses: GuHouse[];

  @OneToMany(() => GuFormation, (guFormation) => guFormation.path)
  guFormations: GuFormation[];

  @OneToMany(() => KillerMove, (killerMove) => killerMove.path)
  killerMoves: KillerMove[];

  @OneToMany(() => Beast, (beast) => beast.path)
  beasts: Beast[];

  @OneToMany(
    () => Character,
    (character) => {
      character.mainPath, character.subPath;
    },
  )
  characters: Character[];

  @OneToMany(() => BlandGheaven, (bland_gheaven) => bland_gheaven.path)
  blands_gheavens: BlandGheaven[];

  @OneToMany(() => SecludedDomain, (secludedDomain) => secludedDomain.path)
  secludedDomains: SecludedDomain[];
}
