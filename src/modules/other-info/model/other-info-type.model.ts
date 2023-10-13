import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'other-info-type' })
export class OtherInfoType {
  @PrimaryColumn({
    name: 'type',
    nullable: false,
  })
  type: string;

  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;
}
