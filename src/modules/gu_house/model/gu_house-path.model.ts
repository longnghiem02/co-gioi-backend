import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/model/abstract-base.model';
import { GuHouse } from 'src/modules/gu_house/model/gu_house.model';
import { Path } from '../../path/model/path.model';

@Entity({ name: 'gu_house-path' })
export class GuHousePath extends AbstractEntity {
  @Column({
    name: 'gu_house_id',
    nullable: false,
  })
  guHouseId: string;

  @Column({
    name: 'path_id',
    nullable: false,
  })
  pathId: string;

  @ManyToOne(() => GuHouse, (guHouse) => guHouse.guHousePaths, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'gu_house_id',
  })
  guHouse: GuHouse;

  @ManyToOne(() => Path, (path) => path.guHousePaths, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'path_id',
  })
  path: Path;
}
