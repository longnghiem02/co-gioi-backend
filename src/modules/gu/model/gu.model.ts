import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Path } from 'src/modules/path/model/path.model';

@Entity({ name: 'gus' })
export class Gu extends AbstractEntity {
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
    name: 'detail',
    nullable: true,
  })
  detail: string;

  @Column({
    name: 'image',
    nullable: true,
    type: 'bytea',
  })
  image: Buffer;

  @Column({
    name: 'path_id',
    nullable: false,
  })
  pathId: number;
  @ManyToOne(() => Path, (path) => path.gus, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'path_id',
  })
  path: Path;
}
