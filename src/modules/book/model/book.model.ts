import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';

@Entity({ name: 'books' })
export class Book extends AbstractEntity {
  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'author',
    nullable: false,
  })
  author: string;

  @Column({
    name: 'intro',
    nullable: true,
  })
  intro: string;

  @Column({
    name: 'view',
    nullable: true,
    default: 0,
  })
  view: number;

  @Column({
    name: 'image',
    nullable: true,
    type: 'bytea',
  })
  image: Buffer;
}
