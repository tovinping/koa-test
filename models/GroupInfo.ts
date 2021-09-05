import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, } from 'typeorm'

@Entity()
export class GroupInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: number

  @Column({unique: true})
  groupId: string

  @Column()
  name: string

  @Column({default: '0'})
  state: '0' | '1' //0正常1已解散

  @Column({default: ''})
  avatar: string

  @Column({default: ''})
  notice: string

  @Column({default: ''})
  owner: string

}
