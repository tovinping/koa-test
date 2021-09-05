import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Friend extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: number
  // 好友帐号
  @Column({unique: true})
  account: string
  // 归属帐号
  @Column({nullable: false})
  owner: string;

}
