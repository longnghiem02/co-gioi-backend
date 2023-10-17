import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Role } from 'src/modules/role/model/role.model';

@Entity({ name: 'accounts' })
export class Account extends AbstractEntity {
  @Column({
    name: 'username',
    nullable: false,
  })
  username: string;

  @Column({
    name: 'email',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'role_id',
    default: 1,
    nullable: false,
  })
  roleId: number;
  @ManyToOne(() => Role, (role) => role.accounts)
  @JoinColumn({
    name: 'role_id',
  })
  role: Role;
}
