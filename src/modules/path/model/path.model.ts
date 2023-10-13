import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Gu } from 'src/modules/gu/model/gu.model';
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

  @OneToMany(() => BlandGheaven, (bland_gheaven) => bland_gheaven.path)
  blands_gheavens: BlandGheaven[];

  @OneToMany(() => SecludedDomain, (secludedDomain) => secludedDomain.path)
  secludedDomains: SecludedDomain[];
}
