import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Path } from 'src/modules/path/model/path.model';
import { OtherInfo } from 'src/modules/other-info/model/orther-info.model';

@Entity({ name: 'beasts' })
export class Beast extends AbstractEntity {
  @Column({
    name: 'name',
    nullable: false,
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
  @ManyToOne(() => Path, (path) => path.beasts)
  @JoinColumn({
    name: 'path_id',
  })
  path: Path;

  @Column({
    name: 'type_id',
    nullable: false,
  })
  typeId: number;
  @ManyToOne(() => OtherInfo, (type) => type.beasts)
  @JoinColumn({
    name: 'type_id',
  })
  type: OtherInfo;

  @Column({
    name: 'rank_id',
    nullable: false,
  })
  rankId: number;
  @ManyToOne(() => OtherInfo, (rank) => rank.beasts)
  @JoinColumn({
    name: 'rank_id',
  })
  rank: OtherInfo;
}