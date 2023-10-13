import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/model/abstract-base.model';
import { Account } from 'src/modules/account/model/account.model';

@Entity({ name: 'role' })
export class Role extends AbstractEntity {
  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'detail',
    nullable: false,
  })
  detail: string;

  @OneToMany(() => Account, (account) => account.role)
  accounts: Account[];
}
