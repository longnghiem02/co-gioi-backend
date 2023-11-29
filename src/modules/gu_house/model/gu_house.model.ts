import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { GuHousePath } from 'src/modules/gu_house/model/gu_house-path.model';

@Entity({ name: 'gu_houses' })
export class GuHouse extends AbstractEntity {
  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'information',
    nullable: true,
  })
  information: string;

  @Column({
    name: 'image',
    nullable: true,
  })
  image: string;

  @OneToMany(() => GuHousePath, (guHousePath) => guHousePath.guHouse)
  guHousePaths: GuHousePath[];
}
