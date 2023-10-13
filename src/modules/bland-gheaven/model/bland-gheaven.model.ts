import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Path } from 'src/modules/path/model/path.model';
import { OtherInfo } from 'src/modules/other-info/model/orther-info.model';

@Entity({ name: 'blands-gheavens' })
export class BlandGheaven extends AbstractEntity {
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
  @ManyToOne(() => Path, (path) => path.blands_gheavens)
  @JoinColumn({
    name: 'path_id',
  })
  path: Path;

  @Column({
    name: 'type_id',
    nullable: false,
  })
  typeId: number;
  @ManyToOne(() => OtherInfo, (type) => type.blands_gheavens)
  @JoinColumn({
    name: 'type_id',
  })
  type: OtherInfo;
}
