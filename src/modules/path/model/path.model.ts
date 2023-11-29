import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Gu } from 'src/modules/gu/model/gu.model';
import { GuHousePath } from '../../gu_house/model/gu_house-path.model';
// import { Character } from 'src/modules/character/model/character.model';
// import { GuFormation } from 'src/modules/gu-formation/model/gu-formation.model';
// import { KillerMove } from 'src/modules/killer-move/model/killer-move.model';
// import { Beast } from 'src/modules/beast/model/beast.model';
// import { SecludedDomain } from 'src/modules/secluded-domain/model/secluded-domain.model';
// import { BlandGheaven } from 'src/modules/bland-gheaven/model/bland-gheaven.model';

@Entity({ name: 'paths' })
export class Path extends AbstractEntity {
  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'information',
    nullable: true,
  })
  information: string;

  @OneToMany(() => Gu, (gu) => gu.path)
  gus: Gu[];

  @OneToMany(() => GuHousePath, (guHousePath) => guHousePath.path)
  guHousePaths: GuHousePath[];

  // @OneToMany(
  //   () => Character,
  //   (character) => {
  //     character.mainPath, character.subPath;
  //   },
  // )
  // characters: Character[];

  // @OneToMany(() => GuFormation, (guFormation) => guFormation.path)
  // guFormations: GuFormation[];

  // @OneToMany(() => KillerMove, (killerMove) => killerMove.path)
  // killerMoves: KillerMove[];

  // @OneToMany(() => Beast, (beast) => beast.path)
  // beasts: Beast[];

  // @OneToMany(() => BlandGheaven, (blandGheaven) => blandGheaven.path)
  // blandsGheavens: BlandGheaven[];

  // @OneToMany(() => SecludedDomain, (secludedDomain) => secludedDomain.path)
  // secludedDomains: SecludedDomain[];
}
