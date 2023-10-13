import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Gu } from 'src/modules/gu/model/gu.model';
import { BlandGheaven } from 'src/modules/bland-gheaven/model/bland-gheaven.model';
import { SecludedDomain } from 'src/modules/secluded-domain/model/secluded-domain.model';

@Entity({ name: 'other-info' })
export class OtherInfo extends AbstractEntity {
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
    () => BlandGheaven,
    (bland_gheaven) => {
      bland_gheaven.type;
    },
  )
  blands_gheavens: BlandGheaven[];

  @OneToMany(
    () => SecludedDomain,
    (secluded_domain) => {
      secluded_domain.type;
    },
  )
  secluded_domains: SecludedDomain[];
}
