import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { Path } from 'src/modules/path/model/path.model';
import { OtherInfo } from 'src/modules/other-info/model/orther-info.model';

@Entity({ name: 'characters' })
export class Character extends AbstractEntity {
  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'title',
    nullable: false,
  })
  title: string;

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
    name: 'main_path_id',
    nullable: false,
  })
  mainPathId: number;
  @ManyToOne(() => Path, (mainPath) => mainPath.characters)
  @JoinColumn({
    name: 'main_path_id',
  })
  mainPath: Path;

  @Column({
    name: 'sub_path_id',
    nullable: false,
  })
  subPathId: number;
  @ManyToOne(() => Path, (subPath) => subPath.characters)
  @JoinColumn({
    name: 'sub_path_id',
  })
  subPath: Path;

  @Column({
    name: 'race_id',
    nullable: false,
  })
  raceId: number;
  @ManyToOne(() => OtherInfo, (race) => race.characters)
  @JoinColumn({
    name: 'race_id',
  })
  race: OtherInfo;

  @Column({
    name: 'physique_id',
    nullable: false,
  })
  physiqueId: number;
  @ManyToOne(() => OtherInfo, (physique) => physique.characters)
  @JoinColumn({
    name: 'physique_id',
  })
  physique: OtherInfo;
}
