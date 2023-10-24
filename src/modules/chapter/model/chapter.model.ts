import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';

@Entity({ name: 'chapters' })
export class Chapter extends AbstractEntity {
  @Column({
    name: 'number',
    nullable: false,
  })
  number: number;

  @Column({
    name: 'title',
    nullable: false,
  })
  title: string;

  @Column({
    name: 'content',
    nullable: true,
  })
  content: string;

  @Column({
    name: 'view',
    nullable: true,
    default: 0,
  })
  view: number;
}
