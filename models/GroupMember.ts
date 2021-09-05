import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class GroupMember extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: number

  @Column()
  account: string

  @Column()
  groupId: string

  @Column({default: '0'})
  type: '0' | '1'; // 0普通成员1管理员

  @Column({default: ''})
  nickName: string
}
